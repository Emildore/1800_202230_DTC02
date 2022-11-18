let taskID = localStorage.getItem("taskID");
console.log(taskID)

function populateInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct task document by referencing to the user uid
                    db.collection("users").doc(user.uid).collection("tasks")
                    .get()
                        .then(allTasks => {
                          allTasks.forEach(currentTask => {
                            if (currentTask)
                            var Taskname = userTasks.data().taskname;
                            var Month = userTasks.data().month;
                            var Day = userTasks.data().day;
                            var Notes = userTasks.data().notes;

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
                          });
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }

//call the function to run it 
populateInfo();

function saveUserInfo() {
  userName = document.getElementById('nameInput').value;       
  userSchool = document.getElementById('schoolInput').value;     
  userCity = document.getElementById('cityInput').value;       
  Task.update({
                      name: userName,
                      school: userSchool,
                      city: userCity
                  })
                  .then(() => {
                      console.log("Document successfully updated!");
                  })
  
  document.getElementById('personalInfoFields').disabled = true;
}
