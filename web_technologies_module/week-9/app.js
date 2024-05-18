// initialize firebase with my config
firebase.initializeApp({
    apiKey: "AIzaSyAG1Ui_eCOarVPM86dzYYU0yLzJRcVs1L4",
    authDomain: "plp-taskmanager.firebaseapp.com",
    projectId: "plp-taskmanager",
});


const db = firebase.firestore();

// adding a new task function
function addTask(){
    const taskInput = document.getElementById("task-input")
    const task = taskInput.ariaValueMax.trim();

    if (task !== ""){
        db.collection("tasks").add({
            task:task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

// rendering task function
function renderTasks(doc){
    const taskList =  document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask(`${doc.id}`)">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

// real-time listener for tasks
db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type === "added"){
                renderTasks(change.doc);
            }
        });
    });

// function to delete a task
function deleteTask(id){
    db.collection("tasks").doc(id).delete();
}