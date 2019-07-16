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
    var firstTime = $("#rate-input").val().trim();
    var frequency = $("#start-input").val().trim();
  
    var newTrain = {
      trainName: trainName,
      trainDestination: trainDestination,
      firstTime: firstTime,
      frequency: frequency,
      
    };
    // Creates local "temporary" object for holding train data
    database.ref().push(newTrain);
    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#rate-input").val("");
    $("#start-input").val("");
});
    // Uploads employee data to the database
    database.ref().on("child_added", function(childSnapshot) {

      var trainName = childSnapshot.val().firstTrain;
      var trainDestination = childSnapshot.val().trainDestination; 
      var firstTime = childSnapshot.val().firstTime;
      var frequency = childSnapshot.val().frequency;

      var time = moment();
      var timeFormat = moment(firstTime, "HH:mm").subtract(1,"years");
      var timeDifference= moment().diff(moment(timeFormat), "minutes");
      var timeRemaining = timeDifference % frequency;
      var timeUntilTrain = frequency - timeRemaining;
      var nextTrain = moment().add(timeUntilTrain, "minutes");
      var arrival = moment(nextTrain).format("hh:mm")

      var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(frequency),
        $("<td>").text(arrival),
        $("<td>").text(timeUntilTrain),
  
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});


