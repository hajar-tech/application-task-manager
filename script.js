
    const modal = document.querySelector('.modal');
    const modalBtn = document.querySelector('.modal-btn');
    const closeBtn = document.querySelector('.close');

    modalBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    });

 


//fonction d'ajout d'une tâche
const taskName = document.querySelector('.name');
const taskDescription = document.querySelector('.description');
const taskPriority = document.querySelector('.priority');
const clickButton = document.querySelector('.btn-click');
const list = document.querySelector('.tasks');





function addTask(){
    const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

    const nameTaskValue = taskName.value.trim();
    const descriptionTaskValue = taskDescription.value.trim();
    const priorityTaskValue = taskPriority.value.trim();

    const objetTask = {nameTaskValue , descriptionTaskValue , priorityTaskValue}

    taskList.push(objetTask);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    console.log(taskList);
     displayTask();
}

clickButton.addEventListener('click', function(){
    addTask();
    // taskName.value = '';
});

// Desplay task
 function displayTask(){
     list.innerHTML = "";
     let taskList = localStorage.getItem("taskList") ? JSON.parse(localStorage.getItem("taskList")) : [];
     taskList.forEach((element, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
         <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow">
                <div>
                    <h3 class="font-bold"> ${element.nameTaskValue}</h3>
                    <span class="text-sm text-gray-500">priority: ${element.priorityTaskValue}</span>
                </div>
                <div class="flex items-center space-x-2">
                <input type="checkbox"  id="done" name="fav_language" value="done">
                    <label for="html">Done</label><br>
                    <button class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"><i class='bx bxs-edit-alt'></i></button>
                    <button onclick= "deletTask(${index})" class=" remove px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><i class='bx bxs-trash-alt' ></i></button>
                </div>
            </div>
        `;

    list.appendChild(li);

         
     });

 }
 //function delete
function deletTask(index) {
    let taskList = localStorage.getItem("taskList") ? JSON.parse(localStorage.getItem("taskList")) : [];
    if(index >= 0 && index < taskList.length){
        taskList.splice(index , 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));
        displayTask();
        
    }

 }
//function for displying completed tasks
 function displayTaskCompleted() {
    let taskList = localStorage.getItem("taskList") ? JSON.parse(localStorage.getItem("taskList")) : [];
    const listDone = document.querySelector('.completed');

    if (!listDone) return; // Vérification que l'élément existe
    listDone.innerHTML = "";

    // Filtrer les tâches qui sont complétées (isDone === true)
    let completedTasks = taskList.filter(task => task.isDone);

    completedTasks.forEach((element) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow">
            <div>
                <h3 class="font-bold">${element.nameTaskValue}</h3>
                <span class="text-sm text-gray-500">Priority: ${element.priorityTaskValue}</span>
            </div>
        </div>
        `;
        listDone.appendChild(li);
    });
}

const checkdone = document.querySelector('.done'); 
checkdone.addEventListener('click',()=>{
    displayTaskCompleted();
})





