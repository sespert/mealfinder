var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.foursquare.com/v2/venues/4bdb0fde63c5c9b66e232668/menu?client_secret=YWT2CD5WRETJNXU3IFPMZWVN3P0ZGM2CJXY0DUNGBPMY5OAL&client_id=B1ZV2KU5GMJRR2CS2BBJ5WYIFGZGAD5C5LXRITK1KK1Q1MZQ&v=20190110",
    "method": "GET",
    "headers": {
      "cache-control": "no-cache",
      "Postman-Token": "603a6cca-6979-4c0f-89df-0cad8d7e2ed6"
    }
   }
   
   $.ajax(settings).done(function (response) {
    console.log(response);
   });
   
   var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.foursquare.com/v2/venues/search?near=Miami,Fl&query=cuban&client_id=B1ZV2KU5GMJRR2CS2BBJ5WYIFGZGAD5C5LXRITK1KK1Q1MZQ&client_secret=YWT2CD5WRETJNXU3IFPMZWVN3P0ZGM2CJXY0DUNGBPMY5OAL&v=20190110",
    "method": "GET",
    "headers": {
      "cache-control": "no-cache",
      "Postman-Token": "c000ac89-e8f6-4f3b-a31b-cea8bd902d3e"
    }
   }
   
   $.ajax(settings).done(function (response) {
    console.log(response);
   });