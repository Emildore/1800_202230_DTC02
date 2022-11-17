// setup = function () {
//     $.ajax(
//         {
//             url: "https://goquotes-api.herokuapp.com/api/v1/random?count=1",
//             type: "GET",
//             success: function (data) {
//                 for (i = 0; i < data.quotes.length; i++) {
//                     $("span").append(

//                         `<p>${data.quotes[i].title}</p>`


//                     )
//                         ;
//                 }
//             },
//             error: function (error) {
//                 console.log(error);
//             }
//         }
//     )
// }

// $(document).ready(setup)

function displayQuotes() {
    // initializing these values for a function later
    let random_int = Math.floor(Math.random() * 74);
    let x = 0
    // grabbing the data from firestore
    db.collection("quotes").get()
        .then(snap => {

            snap.forEach(doc => { //iterate thru each doc
                // below code peudo randomizes the quotes that are being pulled through firestore
                x++
                if (x == random_int) {

                    var quote = doc.data().quote;
                    var author = doc.data().author;
                    // these codes allow the values from firestore to be injected in html
                    $(`#quote`).html(`"${quote}"`)
                    $(`#author`).html(`-${author}`)

                    random_int++

                }
            })
        })
}

displayQuotes();


function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name); //jquery
                // document.getElementByID("name-goes-here").innetText=user_Name;
            })
        }

    })
}

// might need to replace with this from lab 11
// // Insert name function using the global variable "currentUser"
// function insertName() {
//     currentUser.get().then(userDoc => {
//         //get the user name
//         var user_Name = userDoc.data().name;
//         console.log(user_Name);
//         $("#name-goes-here").text(user_Name); //jquery
//         // document.getElementByID("name-goes-here").innetText=user_Name;
//     })
// }

insertName();
