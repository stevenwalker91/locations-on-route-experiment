# locations-on-route-experiment

# Summary
This is a brief experiment to explore how I could take a GPX route as an input, and compare that route against some pre-defined locations to check if the route covers them. For example, perhaps you want to check what cafes will appear along your cycle.

## See it live 

[Demo](https://woftis.github.io/locations-on-route-experiment/)

## How it works
In essence I have pulled out an activity from the Strava API and taken the route details which is a poly line. This line then gets decoded into an array of coordinates. 

We create a GeoJSON linestring from the coords and then add a buffer to it. The buffer essentially expands the route by a pre-defined number of metres to account for GPS inaccuracy and someone not neccesarily being on the exact same GPS position. 

The route then gets applied to the map and we create a buffer box around it. The buffer box gets used to filter the list of locations - e.g. rather than taking potentially thousands of locations from a DB and computing them, we can only return coordinates that are within the bounding box, reducing the need for additional computation.

Given this is an experiment, there is no db connection. I have a sring of some pre-defined locations, and for the purpose of testing at scale there is a function that will create random additional locations anywhere on the visible map. This let me very quickly see how it handled comparing tens of thousands of locations.

Once we have a list of locations within the bounding box, we use TurfJS `booleanIntersects` function on each location to check if it intersects with the route. 

Assuming we were using this in a real life scenario, we could then take any locations that match and perform some actions on them e.g. update db to say the user visited that location.

## Disclaimer
Given this is just an experiment, the code is very rough, not modularised or organised very effectively. It also contains a number of functions that are there purely for testing and validation of the results.

## Next Steps

This was purely an experiment but further down the line, I intend to use the learnings for this on a personal project where I will fully integrate with Strava and allow users to track places visited.

I also neeed to further explore geospatial databases, how these works and whether they could perhaps further reduce computation required. For example, rather than querying every point in the bounding box with javascript, could I perhaps pass in a polygon of the buffered route to the database, thereby only returning matching locations and removing the need to check the locations on the client side? 
