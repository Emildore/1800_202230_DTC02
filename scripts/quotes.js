// This function stores the data from API to Firestore, data is already stores so it's commented out
// var listQuotes = {}
// //https://stoicquotesapi.com/quotes
// setup = function () {
//     $.ajax(
//         {
//             url: "https://stoicquotesapi.com/v1/api/quotes?page=5",
//             type: "GET",
//             success: function (quotesList) {
//                 quotesList.data.forEach(eachQuotes => {

//                     //defining a variable for the collection i want to create in Firestore to populate data
//                     var quotesRef = db.collection("quotes");

//                     quotesRef.add({
//                         quote: eachQuotes.body, // adding the quote to Firestore
//                         author: eachQuotes.author, //adding the author to Firestore
//                     });
//                 });
//             },
//             error: function (error) {
//                 console.log(error);
//             }
//         }
//     )
// }
// $(document).ready(setup);

// this function retrieves the data from firestore and populates it into html using peudo randomizer
function displayQuotes() {
    // initializing these values for a function later
    let random_int = Math.floor(Math.random() * 74);
    let x = 0
    let y = 0
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
                    $(`#random_quote${y}`).html(quote)
                    console.log($(`#random_quote${y}`).html(quote))
                    $(`#random_author${y}`).html(author)

                    random_int++
                    y++
                }
            })
        })
}
displayQuotes();
