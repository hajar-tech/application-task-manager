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
const taskProperty = document.querySelector('.priority');
const clickButton = document.querySelector('.btn-click');
const list = document.querySelector('.tasks');


const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

function addTask(){
    

    const nameTaskValue = taskName.value.trim();
    const descriptionTaskValue = taskDescription.value.trim();
    const taskPropertyValue = taskProperty.value.trim();

    const objetTask = {nameTaskValue , descriptionTaskValue , taskPropertyValue}

    taskList.push(objetTask);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    taskName.value = '';
    taskDescription.value = '';
    taskName.value = '';
    taskDescription.value = '';
    taskProperty.value = 'choose a priority';
    console.log(taskList);
    
     DisplayTask();
}

clickButton.addEventListener('click', function(){
    addTask();
    // taskName.value = '';
});

// // Fonction pour modifier une tâche
// function editTask(index) {
//     const task = taskList[index];
//     taskName.value = task.nameTaskValue;
//     taskDescription.value = task.descriptionTaskValue;
//     taskProperty.value = task.taskPropertyValue;

//     // Mettre à jour le bouton pour sauvegarder les modifications
//     clickButton.removeEventListener('click', addTask);
//     clickButton.addEventListener('click', function updateTask() {
//         task.nameTaskValue = taskName.value.trim();
//         task.descriptionTaskValue = taskDescription.value.trim();
//         task.taskPropertyValue = taskProperty.value.trim();

//         localStorage.setItem("taskList", JSON.stringify(taskList));
//         DisplayTask();

//         // Réinitialiser le bouton pour ajouter des tâches
//         clickButton.removeEventListener('click', updateTask);
//         clickButton.addEventListener('click', addTask);
//     });
// }

// Desplay task
function DisplayTask(){
    list.innerHTML = "";
    taskList.forEach((element, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
         <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow">
                <div>
                    <h3 class="font-bold"> ${element.nameTaskValue}</h3>
                    <span class="text-sm text-gray-500">priority: ${element.taskPropertyValue}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><input type="checkbox" id="done" name="fav_language" value="done"></button>
                    <button onclick="editTask(${index})" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"><i class='bx bxs-edit-alt'></i></button>
                    <button onclick="deletTask(${index})" class=" remove px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><i class='bx bxs-trash-alt' ></i></button>
                </div>
            </div>
        `;

        list.appendChild(li);
    });
}

//  function displayTaskCompleted(){
//     taskList.forEach((element, index) =>{
//         const li = document.createElement("li");
//         if(element.statutTaskValue == 'Done'){
//             li.innerHTML = `
            
//             `
//         }

//     })
//  }

 
// Fonction pour supprimer une tâche
function deletTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
    DisplayTask();
}



//pomodoro code
let pomodoro = document.getElementById('pomodoro-timer');
let short = document.getElementById('short-timer');
let long = document.getElementById('long-timer');
let timers = document.querySelectorAll('.timer-display');
let session = document.getElementById('pomodoro-session');
let shortBreak = document.getElementById('short-break');
let longBreak = document.getElementById('long-break');
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let timerMsg = document.getElementById('timer-message');
let button = document.querySelector('.button');

let currentTimer = null;
let myInterval = null;
//show the timer
function showTimer() {
    pomodoro.style.display = 'block';
    short.style.display = 'none';
    long.style.display = 'none';
}
showTimer();
 
function hideAll () {
    timers.forEach((timer) => {
        timer.style.display = 'none'
    });
}

session.addEventListener('click', () => {
    hideAll();
    pomodoro.style.display = 'block';

    session.classList.add('active');
    shortBreak.classList.remove('active');
    longBreak.classList.remove('active');

    currentTimer = pomodoro;
});

shortBreak.addEventListener('click', () => {
    hideAll();
    short.style.display = 'block';

    session.classList.remove('active');
    shortBreak.classList.add('active');
    longBreak.classList.remove('active');

    currentTimer = short;
});

longBreak.addEventListener('click', () => {
    hideAll();
    long.style.display = 'block';

    session.classList.remove('active');
    shortBreak.classList.remove('active');
    longBreak.classList.add('active');
    currentTimer = long;
});

//start the timer on click
function startTimer(timerDisplay){
    if(myInterval){
        clearInterval(myInterval);
    }
    timeDuration = timerDisplay.getAttribute('data-duration').split(':')[0];

    let durationInMilliSeconds = timeDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationInMilliSeconds;

    myInterval = setInterval(() => {
        const timeRemainig = new Date(endTimestamp - Date.now());

        if(timeRemainig <= 0){
            clearInterval(myInterval);
            timerDisplay.textContent= 'none';

            const alarm = new Audio('https://freesound.org/data/previews/316/316847_4939433-lq.mp3');
            alarm.play();
        }else{
           const minutes = Math.floor(timeRemainig / 60000);
           const seconds = ((timeRemainig % 60000 ) / 1000).toFixed(0);
           const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`; 
              timerDisplay.textContent = formattedTime;  
        }

    }, 1000);
}


//start the timer on click
startBtn.addEventListener('click', () => {
    if(currentTimer){
       startTimer(currentTimer);
       timerMsg.style.display= 'none';
    }else{
       timerMsg.style.display= 'flex';
    }
});

//stop the timer on click
stopBtn.addEventListener('click', () => {
    clearInterval(myInterval);
});


// // mise en situation
// const hovers = document.querySelectorAll('.cache');
// hovers.forEach((hover) =>{
//     hover.addEventListener('click',()=>{
//         hover.classList.add('hidden');
//     })
// })
