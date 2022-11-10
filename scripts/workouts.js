function readQuote() {
    db.collection("workouts").doc("ONzG4fYD0U7HINn7wFO0")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
        .onSnapshot(somedoc => {                                                               //arrow notation
            console.log("current document data: " + somedoc.data());                          //.data() returns data object
            document.getElementById("perf-goes-here").innerHTML = somedoc.data().performance;      //using javascript to display the data on the right place
            document.getElementById("exercises-goes-here").innerHTML = somedoc.data().exercises;
            document.getElementById("date-goes-here").innerHTML = somedoc.data().date;
            document.getElementById("type-goes-here").innerHTML = somedoc.data().type;
            //Here are other ways to access key:value data fields
            //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
            //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
        })
}
readQuote();        //calling the function