$(document).ready(function() {
  //Global variables
  var ingredientList = [];
  var ingredForQuery = [];
  var items;
  //var itemID =[];
  var apiKey = "5xw4QaTb3Wmsh8AQrQQBKOLf93yXp10FyXNjsnN6kLNdE5w3P6";
  var queryURLRecipes = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=" 
  
  $("#search-page").hide();
  $("#results-page").hide();

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


  //Expands each button for user input and hides the other button
  $('.new-button').on('click', function (event) {
    event.preventDefault();
    $(".signin-button").hide();
    $(".new-button").hide();
    $('form div').addClass('active');
  });

  $('.signin-button').on('click', function (event) {
    event.preventDefault();
    $(".new-button").hide();
    $(".signin-button").hide();
    $('form div').addClass('active');
  });

  //User validation for new user
  function validateUserInput() {
      var userName = $("#user-input").val().trim();
      if (userName == "") {
        $("#alert").text("Name must be filled out");
        return false;
      } else {
          return userName;
      }
    }
    
  $("#reg-submit").on("click", function(event){
    event.preventDefault();
    console.log("test")
   // userName = validateUserInput().toLowerCase();

    var email = $('#reg-email').val().trim()
    var password = $('#reg-password').val().trim()

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      $("#search-page").show();
      // ...
    });
   // database.ref("users").child(newUser.name).set(newUser);

    //Hides the login buttons
    $("#login-page").hide();
    //Shows the ingredient search buttons

    // database.ref("users").on("child_added", function(childSnapshot) {
    //   console.log(childSnapshot.val());

    //   var existingUsers = [];
    //   var len = childSnapshot.val().length;
    //   console.log(len);

      // for (var j=0;j<len; j++) {
      //   existingUsers.push()
      // }
      


      // for (var i=0;i<.length;i++) {
      //   if (userName == existingUsers[i]) {
      //     alert("taken");
      //   } else {
      //     alert("good");
      //   }
      // }
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("test")
      $("#login-page").hide();
      $('#search-page').show();
      $(".sign-out-btn").show();
    } else {
      $(".sign-out-btn").hide();
      // No user is signed in.
    }
  });
  
  $('#login').on('click', function(){
    console.log("in login")
    var email= $('#email').val()
    var password = $('#password').val()
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if(error){
        $("#error-msg").text(errorMessage)
      }

      // ...
    });

    // Check if user is signed in);

  })


  $(".sign-out-btn").on('click', function(){
    console.log("test")
    firebase.auth().signOut().then(function() {
      $("#search-page").hide();
      $(".sign-out-btn").hide();
      $("#login-page").show();

    }).catch(function(error) {

    });
  })
  //User validation for returning user

  //Display favorite items
  //If empty, display no favorites, start adding it

  // var recipes = [];
  // //Firebase link to add user to database
  // // Creates local "temporary" object for holding user data
  //   var newUser = {
  //     name: userName,
  //     favoriteRecipes: recipes,        
  //   };
  
    //Read ingredients from input field, create an array
    $(".add-item").on('click', function (event) {
      event.preventDefault();
      items= $(".ingredientToSearch").val().trim();
      $("#ingredients").append("<div id='" + items + "'>" + items + "  <span id='delete'>X</span></div>");
      $(".ingredientToSearch").val("");
      ingredientList.push(items);
      console.log(ingredientList);
      
    });

    //Add a listener to the document for when an ingredient needs
    //to be deleted. We can't use .click, because the element is dynamically created.
    $(document).on("click", "#delete", removeIngredient);
    
    //Function to remove an ingredient
    function removeIngredient () {
      //Select the value to be removed by looking at the value of the button clicked
      var itemToRemove = $(this).closest("div").attr('id');
      //Save a new array of items by removing the deleted item
      ingredForQuery = arrayRemove(ingredientList, itemToRemove);
      //Remove from ingredient list
      $(this).closest("div").remove();
      console.log(itemToRemove);    
      console.log("After remove: "+ ingredForQuery);
      ingredientList = ingredForQuery;
      console.log(ingredientList);
    }

    //Function to help remove items from array
    function arrayRemove(arr, value) {
      return arr.filter(function(ele) {
          return ele != value;
      })
    }

    //If no ingredients are deleted, the array for the API search will be the same as the ingredients added
    if (ingredForQuery.length === 0) {
      ingredForQuery = ingredientList;
      console.log(ingredForQuery.length);
      console.log(ingredForQuery);
    } 

    //When ready to search, user presses search button to display recipes and restaurants
    $("#search-ingred").on('click', function (event) {
      event.preventDefault();
      //Hide buttons from login and search
      $("#login-page").hide();
      $("#search-page").hide();
      //Show results div that's going to be populated with list of recipes and restaurants
      $("#results-page").show();
      console.log(ingredForQuery);
      //Function to search recipes
      searchRecipes(ingredForQuery);
    });
  
    //Send the array to recipe search query of the API
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
            console.log(results[j])
            var divCard = $('<div class="card-mb-3 w-25">');
            var imageCard = $('<img class="card-img-top recipeCard" id="' + results[j].id + '">');
            var bodyCard = $('<div class="card-body">');
            var titleCard = $('<h5 class="card-title">');
            var textCard = $('<p class="card-text">');
            imageCard.attr("src", results[j].image);
            //imageCard.attr("val", results[j].id);          
            titleCard.text(results[j].title);
            textCard.text("Cost: $");
            bodyCard.append(titleCard, textCard);
            divCard.append(imageCard, bodyCard);
            $("#recipe-list").append(divCard);
            document.getElementById(results[j].id).addEventListener("click", function(event){
              showRecipe(event.target.id)
            })
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
    
    
  
    //Append restaurants to another column
    //Use googlemaps API for distance
  
  
    //When clicking on the restaurants ????
  
    //Choose favorites by clicking the heart and save it to the database
  
});


$("#search-ingred").on("click", function(){
  $("#results-page").show();
})



