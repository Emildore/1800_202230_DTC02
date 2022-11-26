

function readSpending() {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            db.collection("users").doc(user.uid).get()
                .then(userDoc => {
                    for (let type of userDoc.data().spendings) {
                        let this_week = 0
                        let week_before = 0
                        let this_month = 0
                        let month_before = 0
                        let ms_week = 1000 * 60 * 60 * 24 * 7
                        let ms_two_weeks = ms_week * 2
                        let ms_month = 1000 * 60 * 60 * 24 * 30
                        let ms_two_months = ms_month * 2

                        db.collection("spending").get()
                            .then(allSpending => {
                                allSpending.forEach(somedoc => {
                                    if (user.uid == somedoc.data().userID && type == somedoc.data().type) {
                                        let current_date = new Date()
                                        var time_difference = current_date.getTime() - somedoc.data().date
                                        console.log(current_date.getTime(), 'current ms')
                                        var int_value = parseInt(somedoc.data().amount)
                                        if (time_difference < ms_week) {
                                            this_week += int_value;
                                            console.log(this_week)
                                        }
                                        if (time_difference > ms_week && time_difference < ms_two_weeks) { week_before += int_value }
                                        if (time_difference < ms_month) { this_month += int_value }
                                        if (time_difference > ms_month && time_difference < ms_two_months) { month_before += int_value }
                                    }
                                })
                            }).then(function () {
                                document.getElementById("type-goes-here").insertAdjacentHTML("afterend", type + '<br>')
                                document.getElementById("week-goes-here").insertAdjacentHTML("afterend", this_week + '<br>')
                                document.getElementById("week-before-goes-here").insertAdjacentHTML("afterend", week_before + '<br>')
                                document.getElementById("month-goes-here").insertAdjacentHTML("afterend", this_month + '<br>')
                                document.getElementById("month-before-goes-here").insertAdjacentHTML("afterend", month_before + '<br>')
                            })
                    }

                })

        } else {
            // No user is signed in.
        }
    });
}
readSpending();

function writeSpending() {
    let Type = document.getElementById("type").value;
    let the_date = document.getElementById("date").value;
    let Amount = document.getElementById("amount").value;
    let date_object = new Date(the_date)

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    db.collection("spending").add({
                        userID: userID,
                        type: Type,
                        date: date_object.getTime(),
                        amount: Amount,
                    })
                })
            currentUser.set({
                spendings: firebase.firestore.FieldValue.arrayUnion(Type)
            }, {
                merge: true
            })

        } else {
            // No user is signed in.
        }
    })
}