let taskID = localStorage.getItem("taskID");
console.log(taskID)

function populateInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct task collection by referencing to the user uid then the task id
                    Task = db.collection("users").doc(user.uid).collection("tasks").doc(taskID);
                    Task.get()
                        .then(userTasks => {
                            var Taskname = userTasks.data().taskname;
                            var Month = userTasks.data().month;
                            var Day = userTasks.data().day;
                            var Notes = userTasks.data().notes;
                            var Priority = userTasks.data().priority;

                            //if the data fields are not empty, then write them in to the form.
                            if (Taskname != null) {
                                document.getElementById("taskname").value = Taskname;
                            }
                            if (Month != null) {
                                document.getElementById("datemonth").value = Month;
                            }
                            if (Day != null) {
                                document.getElementById("dateday").value = Day;
                            }
                            if (Notes != null) {
                                document.getElementById("notes").value = Notes;
                            }
                            if (Priority == true) {
                                document.getElementById("priority").checked = true;
                            }
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateInfo();

function saveTaskInfo() {
  Taskname = document.getElementById("taskname").value;
  Month = document.getElementById("datemonth").value;
  Day = document.getElementById("dateday").value;
  Notes = document.getElementById("notes").value; 
  if ($('#priority').is(":checked"))
            {
              // it is checked
              Priority = true
            } else {
              Priority = false
            }     
  // writes to firebase
  Task.update({
                      taskname: Taskname,
                      month: Month,
                      day: Day,
                      notes: Notes,
                      priority: Priority,
                      last_updated: firebase.firestore.FieldValue.serverTimestamp() 
                  })
                  .then(() => {
                      alert("Task successfully updated!");
                      setTimeout(gototodolist, 1000)
                  })
}

// automatically goes to the to do list
function gototodolist () {
  window.location.href = "../todolist.html";
}

function setup () {
  $("#savetask").click(saveTaskInfo)
}

$(document).ready(setup);