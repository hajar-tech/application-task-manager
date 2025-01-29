window.addEventListener('DOMContentLoaded', () => {
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

 
});

//fonction d'ajout d'une tâche
const taskName = document.querySelector('.name');
const taskDescription = document.querySelector('.description');
const taskStatut = document.querySelector('.statut');
const clickButton = document.querySelector('.btn-click');
const list = document.querySelector('.tasks');


const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

function addTask(){

    const nameTaskValue = taskName.value.trim();
    const descriptionTaskValue = taskDescription.value.trim();
    const statutTaskValue = taskStatut.value.trim();

    const objetTask = {nameTaskValue , descriptionTaskValue , statutTaskValue}

    taskList.push(objetTask);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    console.log(taskList);
     DisplayTask();
}

clickButton.addEventListener('click', function(){
    addTask();
    // taskName.value = '';
});

// Desplay task
 function DisplayTask(){
     list.innerHTML = "";
     taskList.forEach(element => {
        const li = document.createElement("li");
        li.innerHTML = `
         <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow">
                <div>
                    <h3 class="font-bold" data-id="${element.id}"> ${element.nameTaskValue}</h3>
                    <span class="text-sm text-gray-500">priority: ${element.statutTaskValue}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"><i class='bx bxs-edit-alt'></i></button>
                    <button class=" remove px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><i class='bx bxs-trash-alt' ></i></button>
                </div>
            </div>
        `;

    list.appendChild(li);

         
     });

 }

 function displayTaskCompleted(){
    taskList.forEach(element =>{
        const li = document.createElement("li");
        if(element.statutTaskValue == 'Done'){
            li.innerHTML = `
            
            `
        }

    })
 }

 //function delete
// Fonction pour supprimer une tâche
function deletTask(index) {
    taskList.splice(index, 1); 
    localStorage.setItem("taskList", JSON.stringify(taskList));
 }




