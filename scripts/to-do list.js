function displayCards(collection) {
  firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let cardTemplate = document.getElementById("taskCardTemplate");
      
          db.collection("users").doc(user.uid).collection(collection).get()
              .then(snap => {
                  snap.forEach(doc => { //iterate thru each doc
                      var taskname = doc.data().taskname;        
                      var month = doc.data().month;  
                      var day = doc.data().day;
                      var notes = doc.data().notes;
                      var priority = doc.data().priority
                      let newcard = cardTemplate.content.cloneNode(true);
      
                      //update task information
                      newcard.querySelector('.taskName').innerHTML = taskname;
                      newcard.querySelector('.month').innerHTML = month;
                      newcard.querySelector('.day').innerHTML = day;
                      newcard.querySelector('.notes').innerHTML = notes;
                      newcard.querySelector('a').onclick = () => setTaskData(taskname);
                      newcard.querySelector('button').onclick = () => {setTaskData(taskname)
                      if (confirm('Do you want to delete this task?')) {
                        // do delete item
                        db.collection("users").doc(user.uid).collection(collection).doc(localStorage.getItem("taskID")).delete();
                        setTimeout(gototodolist, 1000)
                        };
                      }
      
                      //attach to gallery
                      if (priority == true) {
                        document.getElementById("priorities").appendChild(newcard);
                      } else {
                        document.getElementById(collection + "-go-here").appendChild(newcard);
                      }
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
// automatically goes to the to do list
function gototodolist () {
  window.location.href = "../todolist.html";
}

displayCards("tasks")