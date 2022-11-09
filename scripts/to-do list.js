function displayCards(collection) {
    let cardTemplate = document.getElementById("taskCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var taskname = doc.data().taskname;        
                var month = doc.data().month;  
								var day = doc.data().day;
                var notes = doc.data().notes;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.taskName').innerHTML = taskname;
                newcard.querySelector('.month').innerHTML = month;
                newcard.querySelector('.day').innerHTML = day;
                newcard.querySelector('.notes').innerHTML = notes;

                //give unique ids to all elements for future use
                newcard.querySelector('.taskName').setAttribute("id", "ctaskName" + i);
                newcard.querySelector('.month').setAttribute("id", "cmonth" + i);
                newcard.querySelector('.day').setAttribute("id", "cday" + i);
                newcard.querySelector('.notes').setAttribute("id", "cnotes" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;   //if you want to use commented out section
            })
        })
        
}

function deleteHandler () {
  
}


function setup () {
  $("body").on('click', '.deletebtn', deleteHandler)
}

displayCards("tasks")
$(document).ready(setup);