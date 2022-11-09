var currentUser;

// I want to get the user information from the database and put them in the profile page
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // go and get the current user info from firestore
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userDoc => {
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().city;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userName != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userName != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })

        } else {
            console.log("No user is signed in")
        }
    });
}
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    userName = document.getElementById("nameInput").value;
    userSchool = document.getElementById("schoolInput").value;
    userCity = document.getElementById("cityInput").value;

    currentUser.update({
        name: userName,
        school: userSchool,
        city: userCity
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;

}