// // This function stores the data from API to Firestore, data is already stores so it's commented out
// var listQuotes = {}
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

function populateQuotesDynamically() {
    let quoteCardTemplate = document.getElementById("quoteCardTemplate");  //card template
    let quoteCardGroup = document.getElementById("quoteCardGroup");   //where to append card

    //doublecheck: is your Firestore collection called "hikes" or "Hikes"?
    db.collection("quotes").get()
        .then(allQuotes => {
            allQuotes.forEach(doc => {
                var quote = doc.data().quote; //gets the name field
                var quoteID = doc.data().code; //gets the unique ID field
                var author = doc.data().author; //gets the length field
                let testQuoteCard = quoteCardTemplate.content.cloneNode(true);
                testQuoteCard.querySelector('.quotes').innerHTML = quote;
                testQuoteCard.querySelector('.authors').innerHTML = author;
                // testQuoteCard.querySelector('a').onclick = () => setQuoteData(quoteID);

                //next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which hike to bookmark based on which hike was clicked
                testQuoteCard.querySelector('i').id = 'save-' + quoteID;
                // this line will call a function to save the hikes to the user's document             
                testQuoteCard.querySelector('i').onclick = () => saveQuote(quoteID);

                // populate with images dynamically on sprint 4
                // testQuoteCard.querySelector('img').src = `./images/${quoteID}.jpg`;
                quoteCardGroup.appendChild(testQuoteCard);
            })
        })
}
populateQuotesDynamically();

function setQuoteData(id) {
    localStorage.setItem('quoteID', id);
}
setQuoteData();

function saveQuote(quoteID) {
    currentUser.set({
        favouriteQuotes: firebase.firestore.FieldValue.arrayUnion(quoteID)
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