firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
    }
});

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate = document.getElementById("CardTemplate");
            bookmarks.forEach(thisQuoteID => {
                console.log(thisQuoteID);
                db.collection("quotes").where("code", "==", thisQuoteID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;

                    if (size == 1) {
                        var doc = queryData[0].data();
                        var quoteName = doc.quote; //gets the quote field
                        var authorName = doc.author; //gets the unique ID field
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = quoteName;
                        newCard.querySelector('.card-text').innerHTML = `- ${authorName}`;
                        newCard.querySelector('a').onclick = () => setQuoteData(quoteID);
                        newCard.querySelector('img').src = "https://picsum.photos/300/200?random=1182347";
                        quotesCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}

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