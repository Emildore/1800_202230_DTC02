// This function stores the data from API to Firestore, data is already stores so it's commented out
// var listQuotes = {}
// //https://stoicquotesapi.com/quotes
// setup = function () {
//     $.ajax(
//         {
//             url: "https://stoicquotesapi.com/v1/api/quotes?page=5",
//             type: "GET",
//             success: function (quotesList) {
//                 quotesList.data.forEach(eachQuotes => {

//                     //defining a variable for the collection i want to create in Firestore to populate data
//                     var quotesRef = db.collection("quotes");

//                     quotesRef.add({
//                         quote: eachQuotes.body, // adding the quote to Firestore
//                         author: eachQuotes.author, //adding the author to Firestore
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

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);

        // the following functions are always called when someone is logged in
        displayQuotes();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

// this function retrieves the data from firestore and populates it into html using peudo randomizer
function displayQuotes() {
    // let quotesCardTemplate = document.getElementById("quotesCardTemplate");  //card template
    // let quotesCardGroup = document.getElementById("quotesCardGroup");   //where to append card
    // initializing these values for a function later
    let random_int = Math.floor(Math.random() * 74);
    let x = 0
    let y = 0
    // grabbing the data from firestore
    db.collection("quotes").get()
        .then(snap => {

            snap.forEach(doc => { //iterate thru each doc
                // below code peudo randomizes the quotes that are being pulled through firestore
                x++
                if (x == random_int) {

                    var quotesID = doc.data().code; //gets the unique ID fields
                    console.log(quotesID)
                    var quote = doc.data().quote;
                    var author = doc.data().author;
                    // these codes allow the values from firestore to be injected in html
                    $(`#random_quote${y}`).html(quote)
                    console.log($(`#random_quote${y}`).html(quote))
                    $(`#random_author${y}`).html(author)

                    random_int++
                    y++
                    // let testQuoteCard = quotesCardTemplate.content.cloneNode(true);
                    // //next 2 lines are new for demo#11
                    // //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                    // //so later we know which hike to bookmark based on which hike was clicked
                    // testQuoteCard.querySelector('i').id = 'save-' + quotesID;
                    // // this line will call a function to save the hikes to the user's document             
                    // testQuoteCard.querySelector('i').onclick = () => saveBookmark(quotesID);

                    // // testQuoteCard.querySelector('img').src = `./images/${quotesID}.jpg`;
                    // quotesCardGroup.appendChild(testQuoteCard);
                }
            })
        })
}
displayQuotes();

function saveBookmark(quoteID) {
    currentUser.set({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(quoteID)
    }, {
        merge: true
    })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + quoteID;
            //console.log(iconID);
            //this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'bookmark';
        });
}
