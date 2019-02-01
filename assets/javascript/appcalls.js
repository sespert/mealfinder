var settings = {
  "async": true,
  "url": "https://ancient-ocean-97660.herokuapp.com/foursquareWrapper?city=Miami,Fl&query=olivegarden",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "Postman-Token": "f1aabd14-c1f5-4f45-b2e4-a88fadeddc62"
  },
  "processData": false,
  "data": ""
}

$.ajax(settings).done(function (results) {
 
  var restaurants = results.response.venues;
  console.log(restaurants)
  // Looping through each result item
  for (var i = 0; i < results.length; i++) {

    // Creating and storing a div tag
    var restaurantDiv = $("<div>");

  }
});

$(".restaurantDiv").on("click", function(event) {

// <div class="restaurantDiv" data-name="Outback Steak House"> </div>

  var restaurant = $(this).data('name'); 
  console.log(restaurant);
  
  var queryURL = "https://ancient-ocean-97660.herokuapp.com/foursquareWrapper?city=Miami,Fl&query=" + restaurant

  setting['url'] = queryURL;

  //within function create ajax call

});


var restaurantList = [];
var restaurant = [];






//$('#addRestaurant').on('click', function (event) {
// event.preventDefault();
// places = $('#inputtable').val().trim();
//$('#restaurants').append(places + " ");
//$('#inputtable'),val("");
//restaurantList.push(places);
//console.log(restaurantList);
//});

$('#search-restaurant').on('click', function (event) {
  console.log(restaurantList)
})








//link url to images 
//append to results page div 
//var restaurant = olive garden --> code olive garden and console log response, then grab the response grab object and send to the DIV
//and give the location of the restaurant 
//generate images 