# wkttogeojson

Give a URL that produces a CSV, and convert a field from WKT to GeoJSON. I was thinking we could use this for data migrations from the current City of Asheville Open Data Catalog to CKAN.

ToDo: 
Specify a specific field to convert - currently always uses the 7th column. 

Examples:
http://ckan.opencivc.com/dataset/test-dataset/resource/15ac0dae-2940-4435-a1b2-4be766aa4e26

https://tranquil-harbor-2018.herokuapp.com/wkttogeojson?id=http://opendataserver.ashevillenc.gov/geoserver/ows?service=WFS&request=GetFeature&srsName=EPSG:4326&typeName=coagis:coa_asheville_neighborhoods&maxFeatures=1000&outputFormat=csv

