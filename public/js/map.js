// const mapDiv = document.getElementById("map");
// console.log("Map Div:", mapDiv);
// console.log("Map Div height:", mapDiv?.clientHeight);
// console.log("Map Div width:", mapDiv?.clientWidth);


// console.log(coordinates);



const map = new maplibregl.Map({
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: coordinates,
  zoom: 8,
  container: "map",
});

map.addControl(new maplibregl.NavigationControl());

map.on('load', () => {
  map.resize();
});

const marker = new maplibregl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .addTo(map);

  



// console.log("Type:", typeof coordinates);
// console.log("Is Array:", Array.isArray(coordinates));
// console.log("0:", coordinates[0], " 1:", coordinates[1]);



// const map = new maplibregl.Map({
//   // style: "https://tiles.openfreemap.org/styles/liberty",
//   style: "https://tiles.openfreemap.org/styles/liberty",
//   // center: [77.1025, 28.7041],
//   center: coordinates,
//   zoom: 10,
//   container: "map",
// });



// let marker = new Marker({
//     color: "#FFFFFF",
//     draggable: true
//   }).setLngLat([coordinates])
//   .addTo(map);

// map.setCenter(coordinates);
// new maplibregl.Marker().setLngLat(coordinates).addTo(map);

// let marker = new Marker({
//     color: "#000",
//     draggable: true
//   }).setLngLat(coordinates)
//   .addTo(map);

// const marker = new maplibregl.Marker({draggable: true})
//         .setLngLat([0, 0])
//         .addTo(map);
