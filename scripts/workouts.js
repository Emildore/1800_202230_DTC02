//Display cards for past workouts.
function displayWorkouts() {
    document.getElementById("workouts-go-here").innerHTML = ''

    let cardTemplate = document.getElementById("workoutCardTemplate");

    //Verify user login. 
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection('workouts').get()
                .then(snap => {
                    //Assemble dates of user workout documents in list.
                    const ms_date_array = [];
                    console.log(ms_date_array)
                    snap.forEach(doc => {
                        if (user.uid == doc.data().userID) {
                            ms_date_array.push(parseInt(doc.data().ms_date))
                        }
                    })
                    //Sort list of dates
                    ms_date_array.sort()
                    ms_date_array.reverse()
                    console.log(ms_date_array)
                    //For each date in list of dates, display workout card.
                    for (seconds of ms_date_array) {
                        snap.forEach(doc => {
                            if (user.uid == doc.data().userID && seconds == doc.data().ms_date) {
                                var date = doc.data().date;
                                var type = doc.data().type;
                                var exercises = doc.data().exercises;
                                var performance = doc.data().performance;
                                let newcard = cardTemplate.content.cloneNode(true);

                                newcard.querySelector('.card-date').innerHTML = date;
                                newcard.querySelector('.card-type').innerHTML = type;
                                newcard.querySelector('.card-exercise').innerHTML = exercises;
                                newcard.querySelector('.card-performance').innerHTML = performance;

                                document.getElementById("workouts-go-here").appendChild(newcard);
                            }
                        })
                    }
                })
        }
    })
}

displayWorkouts();

//Take data from workout adding form to add to workouts collection. 
function writeWorkout() {
    //Take data from workout adding form.
    let Type = document.getElementById("type").value;
    let Datestring = document.getElementById("date").value;
    let Exercise = document.getElementById("exercise").value;
    let Performance = document.getElementById("performance").value;

    date_object = new Date(Datestring)

    //Verify user login. 
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //Add workout data to new document in workouts collection. 
                    db.collection("workouts").add({
                        userID: userID,
                        type: Type,
                        date: date_object.toDateString(),
                        ms_date: date_object.getTime(),
                        exercises: Exercise,
                        performance: Performance
                    })
                    //Re-display the workouts on the page. 
                }).then(function () {
                    displayWorkouts();
                });
        } else {
            // No user is signed in.
        }
    })
} 