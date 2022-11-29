// Checks if a user is signed in:
// parameter type: firebase reference - any variable type
// return: none
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getSavedQuotes(user)
    } else {
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

// This function check if a user exist in database and if so, get the saved quotes.
// parameter: user
// parameter type: firebase reference - any variable type
// return: none
function getSavedQuotes(user) {
    db.collection("users").doc(user.uid).get() // get the user document from the database
        .then(userDoc => {
            var favouriteQuotes = userDoc.data().favouriteQuotes;
            console.log(favouriteQuotes);

            let quoteCardTemplate = document.getElementById("quoteCardTemplate");
            favouriteQuotes.forEach(thisQuoteID => {
                console.log(thisQuoteID);
                db.collection("quotes").where("code", "==", thisQuoteID).get().then(snap => { // get the quote document from the database
                    size = snap.size;
                    // console.log(size);
                    queryData = snap.docs;

                    // if there are more than one favouriteQuotes in the database then the following code will be executed
                    // querySelectorAll returns an array of elements into their respective variables in HTML
                    if (size >= 1) {
                        var doc = queryData[0].data();
                        var quote = doc.quote;
                        var author = doc.author;
                        let newCard = quoteCardTemplate.content.cloneNode(true);
                        newCard.querySelector('.quotes').innerHTML = quote; // set the quote text in the card body 
                        console.log(quote);
                        newCard.querySelector('.authors').innerHTML = author;
                        quoteCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}