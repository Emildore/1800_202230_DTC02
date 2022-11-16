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
                    let userZip = userDoc.data().zip;

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
                    if (userName != null) {
                        document.getElementById("inputZip").value = userZip;
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
        zip: userZip,


    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;

}

// function showUploadedPicture() {
//     const fileInput = document.getElementById("mypic-input");   // pointer #1
//     const image = document.getElementById("mypic-goes-here");   // pointer #2

//     //attach listener to input file
//     //when this file changes, do something
//     fileInput.addEventListener('change', function (e) {

//         //the change event returns a file "e.target.files[0]"
//         var blob = URL.createObjectURL(e.target.files[0]);

//         //change the DOM img element source to point to this file
//         image.src = blob;    //assign the "src" property of the "img" tag
//     })
// }
// showUploadedPicture();


function uploadUserProfilePic() {
    // Let's assume my storage is only enabled for authenticated users 
    // This is set in your firebase console storage "rules" tab

    firebase.auth().onAuthStateChanged(function (user) {
        var fileInput = document.getElementById("mypic-input");   // pointer #1
        const image = document.getElementById("mypic-goes-here"); // pointer #2

        // listen for file selection
        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            var blob = URL.createObjectURL(file);
            image.src = blob;            // display this image

            //store using this name
            var storageRef = firebase.storage().ref("images/" + user.uid + ".jpg");

            //upload the picked file
            storageRef.put(file)
                .then(function () {
                    console.log('Uploaded to Cloud Storage.');

                })

            //get the URL of stored file
            storageRef.getDownloadURL()
                .then(function (url) {   // Get URL of the uploaded file
                    console.log(url);    // Save the URL into users collection
                    db.collection("users").doc(user.uid).update({
                        "profilePic": url
                    })
                        .then(function () {
                            console.log('Added Profile Pic URL to Firestore.');
                        })
                })
        })
    })
}
uploadUserProfilePic();

// function displayUserProfilePic() {
//     console.log("hi");
//     firebase.auth().onAuthStateChanged(function (user) {      //get user object
//         db.collection("users").doc(user.uid)                  //use user's uid
//             .get()                                            //READ the doc
//             .then(function (doc) {
//                 var picUrl = doc.data().profilePic;           //extract pic url

//                 // use this line if "mypicdiv" is a "div"
//                 $("#mypicdiv").append("<img src='" + picUrl + "'>")

//                 // use this line if "mypic-goes-here" is an "img"
//                 // $("#mypic-goes-here").attr("src", picUrl);
//                 console.log("hi");
//             })
//     })
// }
// displayUserProfilePic();