function readWorkouts() {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("workouts").get()
                .then(allWorkouts => {
                    allWorkouts.forEach(somedoc => {
                        if (user.uid == somedoc.data().userID) {
                            document.getElementById("perf-goes-here").insertAdjacentHTML("afterend", somedoc.data().performance + '<br>');      //using javascript to display the data on the right place
                            document.getElementById("exercises-goes-here").insertAdjacentHTML("afterend", somedoc.data().exercises + '<br>')
                            document.getElementById("date-goes-here").insertAdjacentHTML("afterend", somedoc.data().date + '<br>')
                            document.getElementById("type-goes-here").insertAdjacentHTML("afterend", somedoc.data().type + '<br>')
                        }
                    })
                })
        }
    })
}

function writeWorkout() {
    let Type = document.getElementById("type").value;
    let Date = document.getElementById("date").value;
    let Exercise = document.getElementById("exercise").value;
    let Performance = document.getElementById("performance").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    db.collection("workouts").add({
                        userID: userID,
                        type: Type,
                        date: Date,
                        exercises: Exercise,
                        performance: Performance
                    })
                })
        } else {
            // No user is signed in.
        }
    });
}

readWorkouts();        //calling the function