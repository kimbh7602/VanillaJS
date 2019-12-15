const greetingForm = document.querySelector(".greeting-form");
const greetingInput = greetingForm.querySelector("input");
const greeting = document.querySelector(".greeting");

const NAME = "name";

function handleDeleteName(event){
    const btn = event.target;
    const div = btn.parentNode;
    greeting.removeChild(div);
    greeting.innerText = `Hello Stranger!`;
    greetingInput.style.display = "inline-block";
    localStorage.removeItem(NAME);
}

function loadName(){
    const name = localStorage.getItem(NAME);
    if(name !== null){
        greeting.innerText = ``;
        const gDiv = document.createElement("div");
        const gSpan = document.createElement("span");
        const gBtn = document.createElement("button");
        gSpan.innerText = `Welcome, ${name}`;
        gBtn.innerText = `❌`;
        gBtn.classList.add("btn");
        gBtn.classList.add("btn-link");
        gBtn.addEventListener("click", handleDeleteName);
        gDiv.appendChild(gSpan);
        gDiv.appendChild(gBtn);
        greeting.appendChild(gDiv);
        greetingInput.style.display = "none";
    }
}

function handleSubmit(event){
    event.preventDefault();
    const value = greetingInput.value;
    localStorage.setItem(NAME, value);
    greetingInput.value = "";
    loadName();
}

function init(){
    loadName();
    greetingForm.addEventListener("submit", handleSubmit);
}

init();