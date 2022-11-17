firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});


function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate = document.getElementById("CardTemplate");
            bookmarks.forEach(thisHikeID => {
                console.log(thisHikeID);
                db.collection("hikes").where("code", "==", thisHikeID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;

                    if (size == 1) {
                        var doc = queryData[0].data();
                        var hikeName = doc.name; //gets the name field
                        var hikeID = doc.code; //gets the unique ID field
                        var hikeLength = doc.length; //gets the length field
                        let newCard = CardTemplate.content.cloneNode(true);
                        // newCard.querySelector('.card-title').innerHTML = hikeName;
                        // newCard.querySelector('.card-length').innerHTML = hikeLength;
                        newCard.querySelector('a').onclick = () => setHikeData(hikeID);
                        newCard.querySelector('img').src = `./images/${hikeID}.jpg`;
                        hikeCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}


function setHikeData(id) {
    localStorage.setItem('quotesID', id);
}

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "bookmarks" array
// Then it will change the bookmark icon from the hollow to the solid version. 
//-----------------------------------------------------------------------------
function saveBookmark(quotesID) {
    currentUser.set({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(quotesID)
    }, {
        merge: true
    })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + quotesID;
            //console.log(iconID);
            //this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'bookmark';
        });
}