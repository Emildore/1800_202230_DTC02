function readSpending() {


    db.collection("spending").get()
        .then(allSpending => {
            allSpending.forEach(somedoc => {
                document.getElementById("history-goes-here").insertAdjacentHTML("afterend", somedoc.data().history + '<br>')
                document.getElementById("type-goes-here").insertAdjacentHTML("afterend", somedoc.data().type + '<br>')
            })

        })
}
readSpending();    