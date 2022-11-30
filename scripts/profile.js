var currentUser;
var ImageFile;      //global variable to store the File Object reference

function chooseFileListener() {
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    if (fileInput) {
        fileInput.addEventListener('change', function (e) {

            //the change event returns a file "e.target.files[0]"
            ImageFile = e.target.files[0];
            var blob = URL.createObjectURL(ImageFile);

            //change the DOM img element source to point to this file
            image.src = blob;    //assign the "src" property of the "img" tag
        })
    }
}
chooseFileListener();


function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");
        console.log("storageRef: " + storageRef);
        console.log("ImageFile: " + ImageFile);

        //Async call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Async call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL.");
                        //get values from the from
                        userName = document.getElementById("inputFirstName").value;
                        userLast = document.getElementById("inputLastName").value;
                        userEmail = document.getElementById("inputEmail").value;
                        userSchool = document.getElementById("inputSchool").value;
                        userAddress = document.getElementById("inputAddress").value;
                        userCity = document.getElementById("inputCity").value;
                        userState = document.getElementById("inputState").value;
                        userZip = document.getElementById("inputZip").value;

                        //Async call to save the form fields into Firestore.
                        db.collection("users").doc(user.uid).update({
                            name: userName,
                            lastName: userLast,
                            email: userEmail,
                            school: userSchool,
                            address: userAddress,
                            city: userCity,
                            state: userState,
                            zip: userZip,
                            profilePic: url // Save the URL into users collection
                        })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                                document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}

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
                    let picUrl = userDoc.data().profilePic;

                    if (userName != null) {
                        document.getElementById("inputFirstName").value = userName;
                    }

                    if (userLast != null) {
                        document.getElementById("inputLastName").value = userLast;
                    }

                    if (userEmail != null) {
                        document.getElementById("inputEmail").value = userEmail;
                    }

                    if (userSchool != null) {
                        document.getElementById("inputSchool").value = userSchool;
                    }

                    if (userCity != null) {
                        document.getElementById("inputCity").value = userCity;
                    }

                    if (userAddress != null) {
                        document.getElementById("inputAddress").value = userAddress;
                    }
                    if (userState != null) {
                        document.getElementById("inputState").value = userState;
                    }
                    if (userZip != null) {
                        document.getElementById("inputZip").value = userZip;
                    }
                    if (picUrl != null) {
                        console.log(picUrl);
                        // use this line if "mypicdiv" is a "div"
                        // $("#mypicdiv").append("<img src='" + picUrl + "'>")
                        $("#mypic-goes-here-profile").attr("src", picUrl);
                    }
                    else
                        console.log("picURL is null");
                })

        } else {
            console.log("no user is logged in")
        }
    }

    )

}
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
    document.getElementById('inputEmail').disabled = true;
}

