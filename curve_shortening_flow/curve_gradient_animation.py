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
texas = curve_utils.curve_from_shapefile(os.path.join('shapefiles','Texas outline','Texas_State_Boundary.shp'), tolerance=.01)
coords = texas.exterior.coords.xy
xmin = min(coords[0])
ymin = min(coords[1])
curve = np.array([[x-xmin,y-ymin] for (x,y) in zip(coords[0], coords[1])])
curve = curve_utils.subdivide_curve(curve_utils.subdivide_curve(curve, threshold=0), threshold=0)

pp_data = np.empty((0,2), float)

curves = []
curves.append(curve)
area = geom.Polygon(curve_utils.close_curve(curve)).area
stepcounter = []
# initialization function: plot the background of each frame
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
    if len(curve) <= 4:
    	return line1, line2, pp_score
    numsteps = 5*math.ceil(i/10)**3

    counter += numsteps
    stepcounter.append(counter)
    curve = gd.flow(curve,numsteps)
    curve = curve_utils.normalize_curve(curve, area)
    curves.append(curve)
    if len(curve) != c_len:
    	c_len = len(curve)
    	print("New length: {}".format(c_len))
    curve_x, curve_y = np.append(curve[:,0], curve[0,0]), np.append(curve[:,1], curve[0,1])
    line1.set_data(curve_x, curve_y)
    pp = max(prev_pp,polsby_popper(np.append(curve, np.array([curve[0]]), axis=0)))
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
anim = animation.FuncAnimation(fig, animate, init_func=init,
                              frames=68, interval=1, blit=True)

Writer = animation.writers['ffmpeg']
ffmpeg = Writer(fps=5, metadata=dict(artist='Me'), bitrate=1800)
#anim.save('global_curves.mp4', writer=ffmpeg)
with open("curve.html",'w') as outfile:
    outfile.write(anim.to_html5_video())
#for i in range(2000):
#    animate(i)







curves = [c.tolist() for c in curves]






#print(len(curves))
with open("curve.js",'w') as outfile:
    json.dump(curves,outfile)
with open("ppdata.js",'w') as outfile:
    json.dump(pp_data.tolist(),outfile)



with open('curve.js', 'r') as original: data = original.read()
with open('curve.js', 'w') as modified: modified.write("var curve_anim = " + data)


with open('ppdata.js', 'r') as original: data = original.read()
with open('ppdata.js', 'w') as modified: modified.write("var pp_anim = " + data)
print(stepcounter)