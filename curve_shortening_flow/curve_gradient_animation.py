import numpy as np
from matplotlib import pyplot as plt
from matplotlib import animation
import curve_gradient_descent as gd 
import shapely.geometry as geom
import curve_utils
import random
import geopandas as gpd
import os
import json
import mpld3
import pickle
import math
import shapely

# First set up the figure, the axis, and the plot element we want to animate
# fig = plt.figure(figsize=(6,6))
fig, (ax1, ax2) = plt.subplots(1,2, figsize=(12,6))
# ax1 = plt.axes(xlim=(-4, 4), ylim=(-4, 4))
ax1.axis([0,20,0,20], aspect='equal')
ax1.set_aspect('equal')
ax2.axis([0,210,0,1])
ax2.set_xlabel("Steps in flow")
ax2.set_ylabel("Polsby-Popper score")
line1, = ax1.plot([], [])
line2, = ax2.plot([], [])
pp_score = ax1.text(0.02, .9, '', transform=ax1.transAxes)
# step_num = ax1.text(0.02, .5, '', transform=ax1.transAxes)
plt.plot([], [])

# Set up the curve whose flow we will animate
# curve = np.array([[0,0],[1,1],[1,2],[0,3],[-1,2],[-1,1]])
#texas = curve_utils.curve_from_shapefile(os.path.join('shapefiles','Texas outline','Texas_State_Boundary.shp'), tolerance=.00)
#cds = gpd.read_file(os.path.join('shapefiles','nc12','nc12.shp')).to_crs({'init': 'epsg:3395'})
cds = gpd.read_file(os.path.join('shapefiles','uscd','cd_us.shp')).to_crs({'init': 'epsg:3395'})
for countdists in range(len(cds)):
    
    if cds.loc[countdists]['STATEFP'] in ["dontskip"]: continue #['23', '42', '36', '24', 
    elif type(curve_utils.curve_from_dataframe(cds, countdists, tolerance = 1000)) == shapely.geometry.multipolygon.MultiPolygon: 
        print(cds.loc[countdists]['GEOID'])
    #     continue
    # #elif type(curve_utils.curve_from_dataframe(cds, countdists, tolerance = 1000))
    # else:
    #     continue
        districtname = cds.loc[countdists]['GEOID']
        curve = curve_utils.curve_from_dataframe(cds, countdists, tolerance = 0)
        biggest = 0
        for i in range(len(curve)):
            if curve[biggest].area < curve[i].area: biggest = i
        coords = curve[biggest].exterior.coords.xy
        tolct = 0
        while (len(coords[0])) > 800:
            tolct +=1
            curve = curve_utils.curve_from_dataframe(cds, countdists, tolerance = tolct)[biggest]
            coords = curve.exterior.coords.xy
        print(coords)

    else:
        
        tolct = 0
        curve = curve_utils.curve_from_dataframe(cds, countdists, tolerance = 0)

        coords = curve.exterior.coords.xy
        while (len(coords[0])) > 800:
            tolct +=1
            curve = curve_utils.curve_from_dataframe(cds, countdists, tolerance = tolct)

            coords = curve.exterior.coords.xy




    xmin = min(coords[0])
    ymin = min(coords[1])
    xmax = max(coords[0])
    ymax = max(coords[1])
    curve = np.array([[x-xmin,-y + ymax] for (x,y) in zip(coords[0], coords[1])])
    #curve = curve_utils.subdivide_curve(curve_utils.subdivide_curve(curve, threshold=0), threshold=0)


    xmin = np.min(curve[:,0])
    xmax = np.max(curve[:,0])
    ymin = np.min(curve[:,1])
    ymax = np.max(curve[:,1])


    tightdim = max(xmax,ymax)
    scalefactor = 400/tightdim
    print("SCALING: ",tightdim,scalefactor,xmin,xmax,ymin,ymax)
    pp_data = np.empty((0,2), float)

    curves = []
    area = 50#3*geom.Polygon(curve_utils.close_curve(curve)).area
    curve = curve_utils.normalize_curve(curve, area)
    #curve = curve_utils.subdivide_curve(curve_utils.subdivide_curve(curve, threshold=0), threshold=0)
    

    stepcounter = []
    # initialization function: plot the background of each frame
    curves.append(curve)

    def init():
        line1.set_data([], [])
        line2.set_data([], [])
        pp_score.set_text('')
        # step_num.set_text('')
        return [line1, line2]

    c_len = 0
    prev_pp = 0.
    counter = 0
    def animate(i):
        print("FRAME {}".format(i))
        global curve
        global pp_data
        global c_len 
        global prev_pp
        global curves
        global counter
        global area
        global stepcounter
        print(prev_pp)
        if len(curve) <= 4 or prev_pp > .999:
        	return line1, line2, pp_score


        

        while polsby_popper(np.append(curve, np.array([curve[0]]), axis=0)) - prev_pp < .005 and polsby_popper(np.append(curve, np.array([curve[0]]), axis=0)) < .998:
            counter+=1
            curve = gd.flow(curve,1)
            if len(curve) < 200: curve = curve_utils.subdivide_curve(curve)

            curve = curve_utils.normalize_curve(curve, area)

        stepcounter.append(counter)
        curves.append(curve)
        if len(curve) != c_len:
        	c_len = len(curve)
        	print("New length: {}".format(c_len))
        if len(curve) < 200: curve = curve_utils.subdivide_curve(curve)
        if prev_pp > .92 and len(curve < 300): curve = curve_utils.subdivide_curve(curve)

        curve_x, curve_y = np.append(curve[:,0], curve[0,0]), np.append(curve[:,1], curve[0,1])
        line1.set_data(curve_x, curve_y)
        pp = max(prev_pp,polsby_popper(np.append(curve, np.array([curve[0]]), axis=0)))
        if pp == prev_pp:  curve = curve_utils.subdivide_curve(curve)
        prev_pp = pp
        pp_data = np.append(pp_data, np.array([[i, pp]]), axis=0)
        line2.set_data(pp_data[:,0], pp_data[:,1])
        pp_score.set_text("Step #: {}\nPolsby-Popper score:\n {}".format(i, pp))
        print(curve.shape)
        # step_num.set_text("Step #:\n {}".format(i))
        return line1, line2, pp_score





    def polsby_popper(closed_curve): 
    	region = geom.Polygon(closed_curve)
    	return (4 * np.pi * region.area) / (region.length ** 2)

    #call the animator.  blit=True means only re-draw the parts that have changed.
    #anim = animation.FuncAnimation(fig, animate, init_func=init,
    #                              frames=67, interval=1, blit=True)

    #Writer = animation.writers['ffmpeg']
    #ffmpeg = Writer(fps=5, metadata=dict(artist='Me'), bitrate=1800)
    #anim.save('global_curves.mp4', writer=ffmpeg)
    #with open("curve.html",'w') as outfile:
    #    outfile.write(anim.to_html5_video())
    #for i in range(2000):
    #    animate(i)


    amstp = 0
    while polsby_popper(np.append(curve, np.array([curve[0]]), axis=0)) < .998:
        animate(amstp)
        amstp +=1



    curves = [curve_utils.normalize_curve(c, scalefactor**2) for c in curves]
    



    curve = curves[0]
    xmin = np.min(curve[:,0])
    xmax = np.max(curve[:,0])
    ymin = np.min(curve[:,1])
    ymax = np.max(curve[:,1])

    tightdim = max(xmax,ymax)
    scalefactor = 350/tightdim

    curves = [scalefactor*c for c in curves]


    curves = [c.tolist() for c in curves]




    curves = [[x,y] for (x,y) in zip(curves,stepcounter)]
    curves = [c+[s] for (c,s) in zip(curves, pp_data[:,1].tolist())]

    print(len(curves[0]))

    #print(len(curves))
    with open("flow_shapes/{}_curve.js".format(districtname),'w') as outfile:
        json.dump(curves,outfile)



    with open("flow_shapes/{}_curve.js".format(districtname), 'r') as original: data = original.read()
    with open("flow_shapes/{}_curve.js".format(districtname), 'w') as modified: modified.write("var curve_anim = " + data)

    print(stepcounter)