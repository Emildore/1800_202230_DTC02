function writeTasks () {
  firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user.uid);
          console.log("Task Created");
          alert("Adding Task...");
          let Taskname = document.getElementById("taskname").value;
          let Month = document.getElementById("datemonth").value;
          let Day = document.getElementById("dateday").value;
          let Notes = document.getElementById("notes").value;
          var tasksRef = db.collection("users").doc(user.uid).collection("tasks").doc(Taskname);
        
            tasksRef.set({
        
              taskname: Taskname,
              month: Month,
              day: Day,
              notes: Notes,
              last_updated: firebase.firestore.FieldValue.serverTimestamp() 
              
            });
            setTimeout(gototodolist, 1000)
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
      }
  })
}

function gototodolist () {
  window.location.href = "../todolist.html";
}

function setup () {
  $("#addtask").click(writeTasks)
}

$(document).ready(setup);