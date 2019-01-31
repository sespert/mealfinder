var settings = {
    "async": true,
    "url": "https://ancient-ocean-97660.herokuapp.com/foursquareWrapper?city=Miami,Fl&query=sportsbar",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Postman-Token": "f1aabd14-c1f5-4f45-b2e4-a88fadeddc62"
    },
    "processData": false,
    "data": ""
   }
   
   $.ajax(settings).done(function (response) {
    console.log(response);
   });
   
   
//append to results page div 
//build api on foursquare --> send to Frank 