import areal_interpolation as areal
import geopandas as gpd


district_shape = "<filename>.shp"
units_shape = "<filename>.shp"
dist_column = "<column name>"


df_cd = gpd.read_file(district_shape)


df_vtd = gpd.read_file(units_shape)

df_vtd['dummy']=1

(df_vtd,new_tar) = areal.aggregate(df_vtd,df_cd,['dummy'],['STATECD'])






        
