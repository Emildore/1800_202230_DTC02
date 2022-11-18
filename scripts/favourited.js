firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getSavedQuotes(user)
    } else {
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


function getSavedQuotes(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var favouriteQuotes = userDoc.data().favouriteQuotes;
            console.log(favouriteQuotes);

            let quoteCardTemplate = document.getElementById("quoteCardTemplate");
            favouriteQuotes.forEach(thisQuoteID => {
                console.log(thisQuoteID);
                db.collection("quotes").where("code", "==", thisQuoteID).get().then(snap => {
                    size = snap.size;
                    // console.log(size);
                    queryData = snap.docs;

                    // idk why this == doesn't work like it does in demo 11 but it is
                    if (size >= 1) {
                        var doc = queryData[0].data();
                        var quote = doc.quote;
                        // var quoteID = doc.code;
                        var author = doc.author;
                        let newCard = quoteCardTemplate.content.cloneNode(true);
                        newCard.querySelector('.quotes').innerHTML = quote;
                        console.log(quote);
                        newCard.querySelector('.authors').innerHTML = author;
                        // newCard.querySelector('img').src = `./images/${quoteID}.jpg`;
                        quoteCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}