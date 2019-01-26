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

    //$("#user-input").val().trim();
    
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
        return validateUserInput();

      });
      // Call Spoonacular API

var apiKey = "5xw4QaTb3Wmsh8AQrQQBKOLf93yXp10FyXNjsnN6kLNdE5w3P6"
var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=apples%2Cflour%2Csugar";

$.ajax({
    url: queryURL,
    method: "GET",
    headers: ({
        "X-Mashape-Key": apiKey
    })
}).then(function (response) {
    console.log(response)
})

});




