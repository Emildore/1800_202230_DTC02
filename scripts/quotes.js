// var listQuotes = {}
// //https://stoicquotesapi.com/quotes
// setup = function () {
//     $.ajax(
//         {
//             url: "https://stoicquotesapi.com/v1/api/quotes?page=5",
//             type: "GET",
//             success: function (quotesList) {
//                 // for (i = 0; i < data.results.length; i++) {
//                 quotesList.data.forEach(eachQuotes => {
//                     // listQuotes[eachQuotes.author] = eachQuotes.body
//                     // console.log(listQuotes)

//                     //define a variable for the collection you want to create in Firestore to populate data
//                     var quotesRef = db.collection("quotes");

//                     quotesRef.add({
//                         quote: eachQuotes.body,
//                         author: eachQuotes.author,    //replace with your own city?
//                         // last_updated: firebase.firestore.FieldValue.serverTimestamp()
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

function displayQuotes() {
    let random_int = Math.floor(Math.random() * 74);
    let x = 0
    let y = 0
    db.collection("quotes").get()
        .then(all_ids => {

            all_ids.forEach(doc => { //iterate thru each doc
                x++
                if (x == random_int) {

                    var quote = doc.data().quote;        // get value of the "name" key
                    var author = doc.data().author;
                    $(`#random_quote${y}`).html(quote)
                    $(`#random_author${y}`).html(author)

                    random_int++
                    y++
                }
            })
        })
}

displayQuotes();
