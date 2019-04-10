$(document).ready(function() {

  //Global variables
  var ingredientList = [];
  var ingredForQuery = [];
  var cityForRestaurants;
  var items;
  var numOfRec = 4;
  var apiKey = "d9f0b4db96msh0b1a2f8611b2667p1a300ajsn5bfa1d26763a";
  var userID;

  //Hide divs from login page
  $("#registration-page").hide();
  $("#search-page").hide();
  $("#favorites-page").hide();
  $("#results-page").hide();
  // $("#.recipes").hide();


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
  var database = firebase.database();

  //Login for existing users. If user not in database, it gives an error
  $('#login').on('click', function(){
    console.log("in login");

    var email= $('#email').val();
    var password = $('#password').val();
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if(error){
        $("#error-msg").text(errorMessage);
      }    
    });
  })

  //If user doesn't have an account, it clicks on the button to go to a registration page
  $("#new-account").on("click", function (event) {
    $("#login-page").hide();
    $("#registration-page").show();
  })
 
  //If user already has a username in the database, he needs to go to the login page
  $(".gologin-button").on("click", function (event) {
    $("#registration-page").hide();
    $("#login-page").show();
  })

  //When a new user fills email and password, a new user is added to the firebase database
  $("#reg-submit").on("click", function(event){
    event.preventDefault();

    console.log("new registration");

    $("#registration-page").hide();
    $("#search-page").show();

    var email = $('#reg-email').val().trim();
    var password = $('#reg-password').val().trim();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)   
    });
  });

  //When a user opens the site again, it checks if it's already logged in.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("userExists");

      userID = user.uid;
      $("#login-page").hide();
      $('#search-page').show();
      return userID;
    } else {
      // No user is signed in.
      $("#login-page").show();
    }
  });

  //If the user wants to sign out...
  $(".sign-out-btn").on('click', function(){
    console.log("signing out");

    $("#favorites-page").hide();

    firebase.auth().signOut().then(function() {
      $("#search-page").hide();
      $("#results-page").hide();
      $("#recipes-page").hide();
      $("#login-page").show();
      }).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);   
    });
  });

  //Read ingredients from input field, and create an array 
  $(".add-item").on('click', function (event) {
    event.preventDefault();

    items= $(".ingredientToSearch").val().trim();
    $("#ingredients").append("<div id='" + items + "'>" + items + "  <span id='delete'>X</span></div>");
    $(".ingredientToSearch").val("");
    ingredientList.push(items);
    
    console.log(ingredientList);
  
  });

  //Save city from user input
  $(".add-city").on('click', function (event) {
    event.preventDefault();

    // $("#alertCity").text("");
    
    cityForRestaurants = $("#city-input").val().trim();
    $("#city").append("<div id='" + cityForRestaurants + "'>" + cityForRestaurants + "  <span id='deleteCity'>X</span></div>");
    $(".cityToSearch").val("");

    console.log(cityForRestaurants);

    if (!cityForRestaurants) {
      $("#alertCity").text("Please add a city");

    }  
  });    
 
  //Add a listener to the document for when an ingredient needs
  //to be deleted. We can't use .click, because the element is dynamically created.
  $(document).on("click", "#delete", removeIngredient); 

  //Function to remove an ingredient from the array
  function removeIngredient () {
    //Select the value to be removed by looking at the value of the button clicked
    var itemToRemove = $(this).closest("div").attr('id');
    //Save a new array of items by removing the deleted item
    ingredForQuery = arrayRemove(ingredientList, itemToRemove);
    //Remove from ingredient list
    $(this).closest("div").remove();
    ingredientList = ingredForQuery;

    console.log(itemToRemove);    
    console.log("After remove: "+ ingredForQuery);    
    console.log(ingredientList);
  }    
  
  //Function to help remove items from array
  function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
      return ele != value;
    })
  };
  
  //If user wants to change city...
  $(document).on("click", "#deleteCity", removeCity);

  //Function to remove city
  function removeCity () {
    $(this).closest("div").remove();
    cityForRestaurants = "";

    console.log("After remove: "+ cityForRestaurants);    
  };
  
  //If no ingredients are deleted, the array for the API search will be the same as the ingredients added
  if (ingredForQuery.length === 0) {
    ingredForQuery = ingredientList;

    console.log(ingredForQuery.length);
    console.log(ingredForQuery);
  };  

  //When ready to search, user presses search button to display recipes and restaurants
  $("#search-ingred").on('click', function (event) {
    event.preventDefault();
    
    $("#recipe-list").empty();
    $("#resultsButtons").show();
    $("#restaurants").empty();
    $(".restaurants").show();
    $("#log-out-btn-res").show();

    if (!cityForRestaurants) {
      $("#alertCity").text("Please enter your city");
    } else {
      //Hide buttons from login and search
      $("#login-page").hide();
      $("#search-page").hide();
      //Show results div that's going to be populated with list of recipes and restaurants
      $("#results-page").show(); 
      $(".recipes").show();
      $("#recipes-page").show();
      //Function to search recipes
      searchRecipes(numOfRec, ingredForQuery);

      console.log(ingredForQuery);
    }
  });

  //Send the array to recipe search query of the API
  function searchRecipes(num, arr) {
    

    var queryURLRecipes = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=" + num + "&ranking=1&ingredients=" ;
      
    console.log(queryURLRecipes);      
    //Add the ingredients from the user list to the query url
    for (var i=0; i<arr.length;i++) {
      queryURLRecipes = queryURLRecipes + "%2C" + arr[i];
    }

    var row = $("<div class='row'>")
  
    $.ajax({
      url: queryURLRecipes,
      method: "GET",
      headers: ({"X-Mashape-Key": apiKey})  
      }).then(function(results) {
        //Append recipes data to one column
        for (var j=0; j<num; j++) {
          var divCard = $('<div class="col">');
          // var imageCard = $('<img class="card-img-top recipeCard" id="' + results[j].id + '">');REMOVED SHER
          var imageCard = $('<img class="card-img-top recipeCard">');
          var bodyCard = $('<div class="card-body">');
          var titleCard = $('<h5 class="card-title">');
          titleCard.text(results[j].title);
          imageCard.attr("src", results[j].image);
          imageCard.attr("data-recipe-id", results[j].id);
          bodyCard.append(titleCard);
          divCard.append(imageCard, bodyCard);
          row.append(divCard)
          $("#recipe-list").append(row);
        }
      })
  };

  //Button to display more recipes
  $("#moreRecipes").on("click", function() {
    $('#recipe-list').empty();
    numOfRec = numOfRec + 4;
    searchRecipes(numOfRec, ingredForQuery);

    console.log(numOfRec);
  });

  //Get id from the recipe clicked to be passed to the instructions API
  $(document).on("click", ".recipeCard", function() {
    var state = $(this).attr("data-recipe-id");
    showRecipe(state);
  });

  //Function to display ingredients and steps of the recipe chosen
  function showRecipe(num) {
    $("#recipes-page").empty();
    $("#restaurants").empty();
    var queryURLinstr = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + num + "/information"
      
    $.ajax({
      url: queryURLinstr,
      method: "GET",
      headers: ({"X-Mashape-Key": apiKey})  
      }).then(function(result) {
        var divRecipe = $('<div>');
        var title = $("<h5>");
        //Added heart button for favorites lists
        var heartButton = $('<span id="favoritePick" style="font-size: 2em; color: white"><i class="fas fa-heart"></i></span>');            
        var details = $("<p class='lead'>");
        var ingredList = $("<ul>");
        var steps = $("<ol>");

        if (result.analyzedInstructions.length != 0) {
        
          title.text(result.title);

          heartButton.attr("data-favorite", result.id);
          details.text("Servings: " + result.servings + "   Preparation time: " + result.readyInMinutes);
          
          for (var i=0;i<result.extendedIngredients.length;i++) {
            ingredList.append("<li>" + result.extendedIngredients[i].originalString + "</li>");
          }
          
          for (var k=0;k<result.analyzedInstructions[0].steps.length;k++) {
            steps.append("<li>" + result.analyzedInstructions[0].steps[k].step + "</li>");
          }
          
          if(result.cuisines.length != 0) {
            console.log("Cuisines " + result.cuisines[0]);
            showRestaurants(cityForRestaurants, result.cuisines[0]);
          } else if (result.diets.length != 0) {
            console.log("Diets" + result.diets[0]);
            showRestaurants(cityForRestaurants, result.diets[0]);
          } else {
            title.text("Try another recipe to see restaurants");
            $(".recipes").show();
            $("#recipes-page").append(title);
          }
              
          $("#recipes-page").show();          
          divRecipe.append(title, heartButton, details, ingredList, steps);
          $("#recipes-page").append(divRecipe);
    
      } else {
        title.text("This recipe is no longer available. Try another one");
        $("#recipes-page").show();
        $("#recipes-page").append(title);
      }         
      console.log(result);
      });
  };

  //Function to display restaurants that have the kind of cuisine or diet of the chosen recipe
  function showRestaurants(string1, string2){
    var queryURLrest = "https://ancient-ocean-97660.herokuapp.com/foursquareWrapper?city=" + string1 + "&query=" + string2;
    
    var settings = {
      "async": true,
      "url": queryURLrest,
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        "Postman-Token": "f1aabd14-c1f5-4f45-b2e4-a88fadeddc62"
      },
      "processData": false,
      "data": ""
    }

    console.log(settings);

    $.ajax(settings).done(function (results) {
      var restaurants = results.response.venues;
      console.log(restaurants);
      // Looping through each result item
      for (var i = 0; i < 5; i++) {
        // Creating and storing a div tag
        var restaurantHead = $("<h5>");
        restaurantHead.text(restaurants[i].name);
        $('#restaurants').append(restaurantHead);      
      }
    });
  };
  
  //When clicking on the heart image, the recipe is added to the user favorites list and the heart turns black
  $(document).on("click", ".fa-heart", function() {

    $("#favoritePick").attr("style", "color: black; font-size: 2em");
    var recipeID = $("#favoritePick").attr("data-favorite");
    console.log("Heart" + recipeID);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log("userExists");
          userID = user.uid;
          firebase.database().ref('users/'+user.uid+'/favorite').push(recipeID);
          $("#favorites-page").show();
      } else {
        // No user is signed in.
        $("#login-page").show();
      }
    });
  });

  //Function to be called to display favorite recipes saved to Firebase for each user
  function showFavoriteRecipes(num) {
    $("#results-page").hide();
    $("#recipes-page").hide();        

    var queryURLfavs = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + num + "/information"          

    $.ajax({
      url: queryURLfavs,
      method: "GET",
      headers: ({"X-Mashape-Key": apiKey})  
      }).then(function(results) {
          var divCard = $('<div class="col">');
          var imageCard = $('<img class="card-img-top favoriteCard">');
          var bodyCard = $('<div class="card-body">');
          var titleCard = $('<h5 class="card-title">');
          titleCard.text(results.title);
          imageCard.attr("src", results.image);
          imageCard.attr("data-recipe-id", results.id);
          bodyCard.append(titleCard);
          divCard.append(imageCard, bodyCard);
          $("#favorites-list").append(divCard);
      })
  };

  //When the favorites button is clicked, the favorite page is displayed
  $(".fav-btn").on("click", function() {
    $("#search-page").hide();
    $("#favorites-page").show();
    $("#favorites-list").empty();
  
    var currentUserID = firebase.auth().currentUser;

    console.log(currentUserID);

    if (currentUserID) {
      console.log("userExists favorite");
      database.ref('users/'+currentUserID.uid+'/favorite').on("child_added", function(childSnapshot) {
        var favoritesIDs = childSnapshot.val();
        console.log("Favorites ids: " + favoritesIDs);
        showFavoriteRecipes(favoritesIDs);          
      });
    }
  });

  //If user wants to go back to the search page...
  $("#search-again").on("click", function() {
    $("#search-page").show();
    $("#favorites-page").hide();
    $("#recipes-page").empty();
    $(".recipes").hide();
    $("#recipes-page").hide();

  }); 
  //In the favorites page, click on an image to display recipe
  $(document).on("click", ".favoriteCard", function() {
    $("#recipes-page").empty();
    var state = $(this).attr("data-recipe-id");
    showRecipeFromFav(state);
  })

  function showRecipeFromFav(num) {
    $("#results-page").show();
    $("#resultsButtons").hide();
    $(".restaurants").hide();
    $("#log-out-btn-res").hide();

    var queryURLinstr = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + num + "/information"
      
    $.ajax({
      url: queryURLinstr,
      method: "GET",
      headers: ({"X-Mashape-Key": apiKey})  
      }).then(function(result) {
        var divRecipe = $('<div>');
        var title = $("<h5>");
        var details = $("<p class='lead'>");
        var ingredList = $("<ul>");
        var steps = $("<ol>");

        if (result.analyzedInstructions.length != 0) {
        
          title.text(result.title);

          details.text("Servings: " + result.servings + "   Preparation time: " + result.readyInMinutes);
          
          for (var i=0;i<result.extendedIngredients.length;i++) {
            ingredList.append("<li>" + result.extendedIngredients[i].originalString + "</li>");
          }
          
          for (var k=0;k<result.analyzedInstructions[0].steps.length;k++) {
            steps.append("<li>" + result.analyzedInstructions[0].steps[k].step + "</li>");
          }
          
          $("#recipes-page").show();          
          divRecipe.append(title, details, ingredList, steps);
          $("#recipes-page").append(divRecipe);
    
      } else {
        title.text("This recipe is no longer available. Try another one");
        $("#recipes-page").show();        
        $("#recipes-page").append(title);
      }         
      console.log(result);
      });
  };

});