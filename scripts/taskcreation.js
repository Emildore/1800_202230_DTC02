function writeTasks () {
  console.log("Task Created")
  alert("Adding Task...")
  var tasksRef = db.collection("tasks");

    let Taskname = document.getElementById("taskname").value;
    let Month = document.getElementById("datemonth").value;
    let Day = document.getElementById("dateday").value;
    let Notes = document.getElementById("notes").value;

    tasksRef.add({

      taskname: Taskname,
      month: Month,
      day: Day,
      notes: Notes,
      last_updated: firebase.firestore.FieldValue.serverTimestamp() 
      
    });
    setTimeout(gototodolist, 1000)
  }

function gototodolist () {
  window.location.href = "../todolist.html";
}

function setup () {
  $("#addtask").click(writeTasks)
}

$(document).ready(setup);