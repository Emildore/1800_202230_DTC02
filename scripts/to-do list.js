function displayCards(collection) {
  firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let cardTemplate = document.getElementById("taskCardTemplate");
      
          db.collection("users").doc(user.uid).collection(collection).get()
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
                      newcard.querySelector('a').onclick = () => setTaskData(taskname);
                      newcard.querySelector('button').onclick = () => {setTaskData(taskname)
                        console.log("Delete")
                      if (confirm('Do you want to delete this task?')) {
                        // do delete item
                        db.collection("users").doc(user.uid).collection(collection).doc(localStorage.getItem("taskID")).delete();
                        setTimeout(gototodolist, 1000)
                        };
                      }
      
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
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    })
}

function setTaskData(id){
            localStorage.setItem ('taskID', id);
            console.log(localStorage)
}

function gototodolist () {
  window.location.href = "../todolist.html";
}

function deleteHandler () {
  console.log("Delete")
  if (confirm('Do you want to delete this task?')) {
    // do delete item
    db.collection("users").doc(user.uid).collection(collection).doc(taskID).delete();
  }
  setTimeout(gototodolist, 1000)
}

displayCards("tasks")