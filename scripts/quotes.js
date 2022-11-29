// This function stores the data from API to Firestore, data is already stores so it's commented out
// parameter type: API - any variable type
// return: none

// var listQuotes = {}
// //Source 
// //https://stoicquotesapi.com/quotes
// setup = function () {
//     $.ajax(
//         {
//             url: "https://stoicquotesapi.com/v1/api/quotes?page=1",
//             type: "GET",
//             success: function (quotesList) {
//                 quotesList.data.forEach(eachQuotes => {

//                     //defining a variable for the collection i want to create in Firestore to populate data
//                     var quotesRef = db.collection("quotes");

//                     quotesRef.add({
//                         quote: eachQuotes.body, // adding the quote to Firestore
//                         author: eachQuotes.author, //adding the author to Firestore
//                         code: eachQuotes.id //adding the id to Firestore

//                     });
//                 });
//             },
//             error: function (error) {
//                 console.log(error);
//             }
//         }
//     )
// }
// $(document).ready(setup);


// Checks if a user is signed in:
// parameter type: firebase reference - any variable type
// return: none
var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        populateQuotesDynamically();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

// This function populates the quotes dynamically from Firestore to the HTML page
// parameter type: firestore reference - any variable type
// return: none
function populateQuotesDynamically() {
    let quoteCardTemplate = document.getElementById("quoteCardTemplate");  //card template
    let quoteCardGroup = document.getElementById("quoteCardGroup");   //where to append card

    // get the quotes document from the database
    db.collection("quotes").get()
        .then(allQuotes => {   //allQuotes is a collection of all the quotes
            allQuotes.forEach(doc => {
                //for each quote in the collection get the data and store it in a variable
                var quote = doc.data().quote; //gets the quote field
                var quoteID = doc.data().code; //gets the unique ID field
                var author = doc.data().author; //gets the author field
                let testQuoteCard = quoteCardTemplate.content.cloneNode(true);
                testQuoteCard.querySelector('.quotes').innerHTML = quote; // set the quote text in a class called quotes
                testQuoteCard.querySelector('.authors').innerHTML = author; // set the author text in a class called authors

                //next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of quoteID" 
                //so later we know which hike to bookmark based on which quote was favourited
                testQuoteCard.querySelector('i').id = 'save-' + quoteID;
                // this line will call a function to save the quotes to the user's document             
                testQuoteCard.querySelector('i').onclick = () => saveQuote(quoteID);
                // this line will append the card to the card group
                quoteCardGroup.appendChild(testQuoteCard);
            })
        })
}


// This function set quoteID with the id of the quote
// parameter type: id - any variable type
// return: none
function setQuoteData(id) { //this function is called when the user clicks on the quote
    localStorage.setItem('quoteID', id); //sets the quoteID to the id of the quote
}
setQuoteData();

//This is to change the icon of the hike that was saved to "filled"
// parameter type: firestore reference - any variable type
// return: none
function saveQuote(quoteID) {
    currentUser.set({
        favouriteQuotes: firebase.firestore.FieldValue.arrayUnion(quoteID) //adds the quoteID to the array
    }, {
        merge: true // this is to merge the data with the existing data
    })
        .then(function () { //if the quote was saved successfully
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + quoteID;
            //console.log(iconID);
            document.getElementById(iconID).innerText = 'bookmark'; // gets the icon id and changes the icon to filled 
        });
}