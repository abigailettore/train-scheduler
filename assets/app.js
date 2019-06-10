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
  $("#add-train-btn").on("click", function() {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTime = $("#rate-input").val().trim();
    var frequency = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
  
    // Creates local "temporary" object for holding train data
    database.ref().push({
   
      trainName: trainName,
      trainDestination: trainDestination,
      firstTime: firstTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $("form")[0].reset();
  });
  
    // Uploads employee data to the database
    database.ref().on("child_added", function(childSnapshot) {
      var minAway;
      // Chang year so first train comes before now
      var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
      // Difference between the current and firstTrain
      var diffTime = moment().diff(moment(firstTrainNew), "minutes");
      var remainder = diffTime % childSnapshot.val().frequency;
      // Minutes until next train
      var minAway = childSnapshot.val().frequency - remainder;
      // Next train time
      var nextTrain = moment().add(minAway, "minutes");
      nextTrain = moment(nextTrain).format("hh:mm");

      $("#add-row").append("<tr><td>" + childSnapshot.val().name +
              "</td><td>" + childSnapshot.val().destination +
              "</td><td>" + childSnapshot.val().frequency +
              "</td><td>" + nextTrain + 
              "</td><td>" + minAway + "</td></tr>");

         
      }, function(errorObject) {
          console.log("Errors handled: " + errorObject.code);
  });

  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    
      $("#train-name-input").html(snapshot.val().trainName);
      $("#destination-input").html(snapshot.val().trainDestination);
      $("#rate-input").html(snapshot.val().firstTime);
      $("#start-input").html(snapshot.val().frequency);
     
  });
