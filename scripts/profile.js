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
                    let userLast = userDoc.data().lastName;
                    let userEmail = userDoc.data().email;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().city;
                    let userAddress = userDoc.data().address;
                    let userState = userDoc.data().state;
                    // let userZip = userDoc.data().Zip;

                    if (userName != null) {
                        document.getElementById("inputFirstName").value = userName;
                    }

                    if (userName != null) {
                        document.getElementById("inputLastName").value = userLast;
                    }

                    if (userName != null) {
                        document.getElementById("inputEmail").value = userEmail;
                    }

                    if (userName != null) {
                        document.getElementById("inputSchool").value = userSchool;
                    }

                    if (userName != null) {
                        document.getElementById("inputCity").value = userCity;
                    }

                    if (userName != null) {
                        document.getElementById("inputAddress").value = userAddress;
                    }
                    if (userName != null) {
                        document.getElementById("inputState").value = userState;
                    }
                    // if (userName != null) {
                    //     document.getElementById("inputZip").value = userZip;
                    // }
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
    userName = document.getElementById("inputFirstName").value;
    userLast = document.getElementById("inputLastName").value;
    userEmail = document.getElementById("inputEmail").value;
    userSchool = document.getElementById("inputSchool").value;
    userAddress = document.getElementById("inputAddress").value;
    userCity = document.getElementById("inputCity").value;
    userState = document.getElementById("inputState").value;
    userZip = document.getElementById("inputZip").value;

    currentUser.update({
        name: userName,
        lastName: userLast,
        email: userEmail,
        school: userSchool,
        address: userAddress,
        city: userCity,
        state: userState,
        // zip: userZip,


    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;

}
