function writeTasks () {
  firebase.auth().onAuthStateChanged(user => {
        if (user) {
          alert("Adding Task...");
          let Taskname = document.getElementById("taskname").value;
          let Month = document.getElementById("datemonth").value;
          let Day = document.getElementById("dateday").value;
          let Notes = document.getElementById("notes").value;
          if ($('#priority').is(":checked"))
            {
              // it is checked
              Priority = true
            } else {
              Priority = false
            }
          var tasksRef = db.collection("users").doc(user.uid).collection("tasks").doc(Taskname);
            // sets the task with the name as the id
            tasksRef.set({
        
              taskname: Taskname,
              month: Month,
              day: Day,
              notes: Notes,
              priority: Priority,
              last_updated: firebase.firestore.FieldValue.serverTimestamp() 
              
            });
            setTimeout(gototodolist, 1000)
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
      }
  })
}
// automatically goes to the to do list
function gototodolist () {
  window.location.href = "../todolist.html";
}

function setup () {
  $("#addtask").click(writeTasks)
}

$(document).ready(setup);