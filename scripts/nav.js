firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
    }
});

function displayUserProfilePic() {
    console.log("hi");
    firebase.auth().onAuthStateChanged(function (user) {      //get user object
        db.collection("users").doc(user.uid)                  //use user's uid
            .get()                                            //READ the doc
            .then(function (doc) {
                var picUrl = doc.data().profilePic;           //extract pic url

                // use this line if "mypicdiv" is a "div"
                //$("#mypicdiv").append("<img src='" + picUrl + "'>")

                // use this line if "mypic-goes-here" is an "img" 
                $("#mypic-goes-here").attr("src", picUrl);
            })
    })
}
displayUserProfilePic();
