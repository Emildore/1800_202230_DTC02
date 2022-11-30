function displayWorkouts() {
    document.getElementById("workouts-go-here").innerHTML = ''

    let cardTemplate = document.getElementById("workoutCardTemplate");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection('workouts').get()
                .then(snap => {
                    const ms_date_array = [];
                    console.log(ms_date_array)
                    snap.forEach(doc => { //iterate thru each doc
                        if (user.uid == doc.data().userID) {
                            ms_date_array.push(parseInt(doc.data().ms_date))
                        }
                    })
                    ms_date_array.sort()
                    ms_date_array.reverse()
                    console.log(ms_date_array)
                    for (seconds of ms_date_array) {
                        //var i = 1;  //if you want to use commented out section
                        snap.forEach(doc => { //iterate thru each doc
                            if (user.uid == doc.data().userID && seconds == doc.data().ms_date) {
                                var date = doc.data().date;        // get value of the "name" key
                                var type = doc.data().type;   // get value of the "details" key
                                var exercises = doc.data().exercises;
                                var performance = doc.data().performance;
                                let newcard = cardTemplate.content.cloneNode(true);

                                //update title and text and image
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

function writeWorkout() {
    let Type = document.getElementById("type").value;
    let Datestring = document.getElementById("date").value;
    let Exercise = document.getElementById("exercise").value;
    let Performance = document.getElementById("performance").value;

    date_object = new Date(Datestring)

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
                        date: date_object.toDateString(),
                        ms_date: date_object.getTime(),
                        exercises: Exercise,
                        performance: Performance
                    })
                }).then(function () {
                    displayWorkouts();
                });
        } else {
            // No user is signed in.
        }
    })
}       //calling the function