import csv
import numpy as np



def swap_cols(e):
    '''given a parsed election e which contains party id in e[2]
       swaps the columns such that the Democrat (if exists) is in column
       with idx 3 (col D in a spreadsheet), the Republican (if exists) is
       in column with idx 4, as many as two independents in columns 5,6
       BLANK in col 7, and totals in col 8
    '''
    
    d_ind = None
    r_ind = None
    i_inds = []
    i1_ind = None
    i2_ind = None
    blank_ind = None
    tot_ind = None
    # sanity check
    if "Democrat" not in e[2] and "Republican" not in e[2] and "BLANK" not in e[0]:
        print("BAD")
        return

    # grab indices
    for i in range(len(e[2])):
        if e[2][i] == "Democrat":
            d_ind = i
        elif e[2][i] == "Republican":
            r_ind = i
        elif e[0][i] == "BLANK":
            blank_ind = i
        elif e[0][i] == "TOTAL VOTES CAST":
            tot_ind = i
        elif len(e[2][i])>2:
            i_inds.append(i)
            
    # examine independents
    while len(i_inds) < 2:
        i_inds.append(None)
    i1_ind = i_inds[0]
    i2_ind = i_inds[1]
    
    
    
    
    # check we have a blank and a tot
    if blank_ind == None or tot_ind == None:
        print("BAD2")
        return
    
    if len(i_inds) > 2:
        print("BAD3")
        print(e)
        return
    e_t = np.array(e).T.tolist()
    
    new_frame_t = e_t[:]
   
    if d_ind == None:
        new_frame_t[3] = e_t[8][:]
    elif d_ind !=3:
        new_frame_t[3] = e_t[d_ind][:]

    if r_ind == None:
        new_frame_t[4] = e_t[8][:]
    elif r_ind !=4:
        new_frame_t[4] = e_t[r_ind][:]
      
        
    if i1_ind == None:
        new_frame_t[5] = e_t[8][:]
    elif i1_ind !=5:
        new_frame_t[5] = e_t[i1_ind][:]
        
        
        
    if i2_ind == None:
        new_frame_t[6] = e_t[8][:]
    elif i2_ind !=6:
        new_frame_t[6] = e_t[i2_ind][:]
        
        
    new_frame_t[7] = e_t[blank_ind][:]
    new_frame_t[8] = e_t[tot_ind][:]
    #new_frame_t[7][2] = max(new_frame_t[7][2],'zz')
    #new_frame_t[7][3] = max(new_frame_t[7][3],'zz')
    
    new_frame = np.array(new_frame_t).T.tolist()
    return(new_frame)
    

    
'''with open('staterep16.csv','r') as dat:
    reader = csv.reader(dat,delimiter='\t',quotechar = '\'')
    elections = []
    elec = []
    count = 1
    for row in reader:
  
        row2 = [x.strip() for x in row]
        row2.append('')
        if len(''.join(row2)) != 0:
            elec.append(row2)
        else:
            
            elections.append(elec)
            elec = []
    elections.append(elec)
with open('clean_staterep16.csv','w') as f:

    writer = csv.writer(f, delimiter='\t')
    for contest in elections:
        c = swap_cols(contest)
        
        writer.writerows(row for row in c if row[0] != '' and row[1]!='')
        
     
print(len(elections))'''


with open('clean_staterep16.csv','r') as dat:
    reader = csv.reader(dat,delimiter='\t',quotechar='\'')
    dist=1
    next(reader,None)
    elec = [1,0,0,0,0,0,0]
    races=[]
    count =0
    for row in reader:
        row[:]=[x if x != '' else 0 for x in row]
        if int(row[0])!=dist:
            dist = dist+1
            races.append(elec)
            elec = [dist,0,0,0,0,0,0]
        elec[1] += int(row[3])
        elec[2] += int(row[4])
        elec[3] += int(row[5])
        elec[4] += int(row[6])
        elec[5] += int(row[7])
        elec[6] += int(row[8])
    races.append(elec)    
            
    print(races)


with open('clean_staterep16_dist_res.csv','w') as f:
    writer = csv.writer(f,delimiter='\t')
    writer.writerow(['dist','democrat','republican','ind1','ind2','blank','total'])
    writer.writerows(r for r in races)
