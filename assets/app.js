// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve a train from the train database.
// 4. Create a way to calculate the when the trains  worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
 
// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCa3kzfWYbt6k7ZCFI1BQJh8Bqg7HsyJ1Y",
  authDomain: "train-scheduler-16178.firebaseapp.com",
  databaseURL: "https://train-scheduler-16178.firebaseio.com",
  projectId: "train-scheduler-16178",
  storageBucket: "",
  messagingSenderId: "855455855198",
  appId: "1:855455855198:web:0cabe1fc801d955d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      role: trainDestination,
      start: trainStart,
      rate: trainRate
    };
  
    // Uploads employee data to the database
    database.ref().push();
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainRate);
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
  
    // Calculate the minutes worked using hardcore math
    // To calculate the minutes worked
    var trainRate = moment().diff(moment(trainStart, "X"), "minutes");
    console.log(trainRate);
  

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainRate),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  