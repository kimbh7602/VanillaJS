const form = document.querySelector(".js-form");
const input = form.querySelector(".input");
const pendingList = document.querySelector(".pending-ul");
const finishedList = document.querySelector(".finished-ul");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pending = [];
let finished = [];

function handleDeletePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanPending = pending.filter(function(pend) {
    return pend.id !== parseFloat(li.id);
  });
  pending = cleanPending;
  savePending();
}

function handleFinishPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  pendingList.removeChild(li);
  const cleanPending = pending.filter(function(pend) {
    return pend.id !== parseFloat(li.id);
  });
  pending = cleanPending;
  savePending();
  const toDo = {
    text: span.innerText,
    id: parseFloat(li.id)
  };
  paintFinished(toDo.text, toDo.id);
}

function handleDeleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = finished.filter(function(fin) {
    return fin.id !== parseFloat(li.id);
  });
  finished = cleanFinished;
  saveFinished();
}

function handleBackFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  finishedList.removeChild(li);
  const cleanFinished = finished.filter(function(fin) {
    return fin.id !== parseFloat(li.id);
  });
  finished = cleanFinished;
  saveFinished();
  const toDo = {
    text: span.innerText,
    id: parseFloat(li.id)
  };
  paintPending(toDo.text, toDo.id);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  const newId = Math.random();
  paintPending(currentValue, newId);
  input.value = "";
}

function paintPending(text, newId) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = `❌`;
  delBtn.classList.add("btn");
  delBtn.classList.add("btn-sm");
  delBtn.classList.add("btn-link");
  delBtn.addEventListener("click", handleDeletePending);
  finBtn.innerText = `✅`;
  finBtn.classList.add("btn");
  finBtn.classList.add("btn-sm");
  finBtn.classList.add("btn-link");
  finBtn.addEventListener("click", handleFinishPending);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const pendingObj = {
    text: text,
    id: newId
  };

  pending.push(pendingObj);
  savePending();
}

function paintFinished(text, newId) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = `❌`;
  delBtn.classList.add("btn");
  delBtn.classList.add("btn-sm");
  delBtn.classList.add("btn-link");
  delBtn.addEventListener("click", handleDeleteFinished);
  finBtn.innerText = `🔙`;
  finBtn.classList.add("btn");
  finBtn.classList.add("btn-sm");
  finBtn.classList.add("btn-link");
  finBtn.addEventListener("click", handleBackFinished);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finishedObj = {
    text: text,
    id: newId
  };

  finished.push(finishedObj);
  saveFinished();
}

function savePending() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
}

function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function loadLS() {
  const pendings = localStorage.getItem(PENDING_LS);
  const finisheds = localStorage.getItem(FINISHED_LS);

  if (pendings !== null) {
    const parsePending = JSON.parse(pendings);
    parsePending.forEach(function(pP) {
      paintPending(pP.text, pP.id);
    });
  }
  if (finisheds !== null) {
    const parseFinished = JSON.parse(finisheds);
    parseFinished.forEach(function(fin) {
      paintFinished(fin.text, fin.id);
    });
  }
}

function init() {
  loadLS();
  form.addEventListener("submit", handleSubmit);
}

init();
