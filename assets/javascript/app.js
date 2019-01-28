$(document).ready(function(){
// Initiate Firebase

    var config = {
        apiKey: "AIzaSyCy-Ar-cQpeBMIXNgJvrohQ-FzvlmfTabQ",
        authDomain: "mealfinder-bad48.firebaseapp.com",
        databaseURL: "https://mealfinder-bad48.firebaseio.com",
        projectId: "mealfinder-bad48",
        storageBucket: "mealfinder-bad48.appspot.com",
        messagingSenderId: "739056825436"
    };
    firebase.initializeApp(config);

  //Expands each button for user input and hide the other button
  $('.new-button').on('click', function (event) {
    event.preventDefault();
    $(".signin-button").hide();
    $('form div').addClass('active');
  });

  $('.signin-button').on('click', function (event) {
    event.preventDefault();
    $(".new-button").hide();
    $('form div').addClass('active');
  });

    //User validation for new user

    function validateUserInput() {
        var name = $("#user-input").val().trim();
        if (name == "") {
          $("#alert").text("Name must be filled out");
          return false;
        } else {
            console.log(name);
        }
      }
    
      $("#submit").on("click", function(event){
        validateUserInput();
        console.log(validateUserInput());
      });
    
    //User validation for returning user

    //Display favorite items
    //If empty, display no favorites, start adding it

    var recipes = [];
    //Firebase link to add user to database
    // Creates local "temporary" object for holding train data
        var newUser = {
          name: userName,
          favoriteRecipes: recipes,        
        };
    
  
    //Read ingredients from input field, create an array
        var ingredients = ["eggs", "onion"];
  
        //var items = $("#inputbox").val().trim();
  
        //ingredients.push(items);
  
    //Send the array to search query of the api
        var apiKey = "5xw4QaTb3Wmsh8AQrQQBKOLf93yXp10FyXNjsnN6kLNdE5w3P6"
        var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=" 
        //var ingredientList = ingredients.toString();
  
        for (var i=0; i<ingredients.length;i++) {
          queryURL = queryURL + "%2C" + ingredients[i];
          
        }
        console.log(queryURL)  //apples%2Cflour%2Csugar
  
      $.ajax({
        url: queryURL,
        method: "GET",
        headers: ({"X-Mashape-Key": apiKey})
        
        }).then(function(response) {
        console.log(response)
      });
  
    //Append recipes data to one column
   var queryURL2 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/search?offset=0&number=10&query=eggs%2Ccheese";
  
   for (var i=0; i<ingredients.length;i++) {
    queryURL2 = queryURL2 + "%2C" + ingredients[i];
    
  }
  console.log(queryURL2)
   $.ajax({
    url: queryURL2,
    method: "GET",
    headers: ({"X-Mashape-Key": apiKey})
    
    }).then(function(response) {
    console.log(response)
  });
  
    //Append restaurants to another column
    //Use googlemaps API for distance
  
  
    //When clicking on a recipe, a new box appears with the ingredients and steps
  
  
    //When clicking on the restaurants ????
  
    //Choose favorites by clicking the heart and save it to the database
  
  
  

});




