$(document).ready(function() {

  //Global variables
  var ingredientList = [];
  var items;
  //var itemID =[];
  var apiKey = "5xw4QaTb3Wmsh8AQrQQBKOLf93yXp10FyXNjsnN6kLNdE5w3P6";
  var queryURLRecipes = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=" 
  var divCard = $('<div class="card-mb-3 w-25">'); 
  var imageCard =  $('<img class="card-img-top" id="recipeCard">');
  var bodyCard = $('<div class="card-body">');
  var titleCard = $('<h5 class="card-title">');
  var textCard = $('<p class="card-text">');


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

  //Expands each button for user input and hides the other button
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
      var userName = $("#user-input").val().trim();
      if (userName == "") {
        $("#alert").text("Name must be filled out");
        return false;
      } else {
          console.log(userName);
          return userName;
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
  // Creates local "temporary" object for holding user data
    var newUser = {
      name: userName,
      favoriteRecipes: recipes,        
    };
  
    //Read ingredients from input field, create an array
    $("#addIngred").on('click', function (event) {
      event.preventDefault();
      items= $("#inputbox").val().trim();
      $("#ingredients").append(items + " ");
      $("#inputbox").val("");
      ingredientList.push(items);
      console.log(ingredientList);
  
    });
  
    $("#search-ingred").on('click', function (event) {
      console.log(ingredientList);
      searchRecipes(ingredientList);
    });
  
    //Send the array to search query of the api
    function searchRecipes(arr) {
      //var ingredientList = arr.toString();
      for (var i=0; i<arr.length;i++) {
        queryURLRecipes = queryURLRecipes + "%2C" + arr[i];
      }
  
      $.ajax({
        url: queryURLRecipes,
        method: "GET",
        headers: ({"X-Mashape-Key": apiKey})  
        }).then(function(results) {
          //Append recipes data to one column
          for (var j=0; j<5; j++) {          
            console.log(results[j].title);
            console.log(results[j].image);
            console.log(results[j].id);
            imageCard.attr("src", results[j].image);
            image.attr("val", results[j].id);          
            titleCard.text(results[j].title);
            textCard.text("Cost: $");
            bodyCard.append(titleCard, textCard);
            divCard.append(imageCard, bodyCard);
            $("#recipe-list").prepend(divCard);
          }
        })
  
    };
  
    function showRecipe(num) {
      var queryURLinstr = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + num + "/information"
  
      $.ajax({
        url: queryURLinstr,
        method: "GET",
        headers: ({"X-Mashape-Key": apiKey})  
        }).then(function(result) {
          console.log(result.instructions);
          
      });
  
    };
    
    //When clicking on a recipe, a new box appears with the ingredients and steps
    $("#recipeCard").on('click', function () {
      alert("image clicked!");
      console.log("Value: " + itemNumber);
      var itemNumber = $("#recipeCard").attr('val');
      showRecipe(itemNumber);
  
    });
  
    //Append restaurants to another column
    //Use googlemaps API for distance
  
  
    //When clicking on the restaurants ????
  
    //Choose favorites by clicking the heart and save it to the database
  
});




