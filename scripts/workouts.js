function readWorkouts() {


    db.collection("workouts").get()
        .then(allWorkouts => {
            allWorkouts.forEach(somedoc => {
                document.getElementById("perf-goes-here").insertAdjacentHTML("afterend", somedoc.data().performance + '<br>');      //using javascript to display the data on the right place
                document.getElementById("exercises-goes-here").insertAdjacentHTML("afterend", somedoc.data().exercises + '<br>')
                document.getElementById("date-goes-here").insertAdjacentHTML("afterend", somedoc.data().date + '<br>')
                document.getElementById("type-goes-here").insertAdjacentHTML("afterend", somedoc.data().type + '<br>')
            })

        })
}

function writeWorkout() {
    let Type = document.getElementById("type").value;
    let Date = document.getElementById("date").value;
    let Exercise = document.getElementById("exercise").value;
    let Performance = document.getElementById("performance").value;

    db.collection("workouts").add({
        type: Type,
        date: Date,
        exercises: Exercise,
        performance: Performance

    })
}

readWorkouts();        //calling the function