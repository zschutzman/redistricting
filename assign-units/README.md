## use the code in the `assign.py` stub to assign districts to geographic units, fusing two shapefiles.

### USAGE:
Make the following replacements and paste the stub into your code
`units_shape`: the shapefile with the units you'd like labelled with district IDs (e.g. Census blocks)
`district_shape`: the shapefile which has district IDs to be assigned (e.g. a Census legislative district file)
`dist_column`: the column in `<dists>.shp` which has a unique identifier for each district (e.g. CD115FP)

The labelled units will be in the `geopandas` dataframe called `df_vtd`

Works by assigning each unit in `<units>.shp` the value in `<dist_column>` corresponding to the shape in `<dists>.shp` with which it has maximum overlap.

`areal_interpolation.py` is from Will Adler with the Princeton Gerrymandering Project, and this code does almost nothing beyond that.
