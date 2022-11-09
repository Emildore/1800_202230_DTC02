async function readJSONhero() {
    const response = await fetch(
        'https://stoicquotesapi.com/v1/api/quotes'
    )
    const data = await response.text(); //get text file, string
    const listQuotes = JSON.parse(data); //convert to JSON

    for (x of listQuotes) {       //iterate thru each hero
        let author = x.author;
        let body = x.body; //creating a string with details
        db.collection("quotes").add({
            author: x.name,
            body: x.body
        })
    }
}
readJSONhero()