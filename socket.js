const socket = io("http://localhost:8000");

const form = document.getElementById("form");
const errdiv = document.getElementById("err");
const parentEme = document.getElementById("messages");

var audio = new Audio("ting.mp3");

function showOnScreen(position, msg) {
  const parentEme = document.getElementById("messages");
  const childEle = document.createElement("ul");
  childEle.className = position;
  if (position === "Joined" || position === "Left") {
    childEle.innerHTML = msg + " " + position;
  } else {
    childEle.innerHTML = msg;
  }
  parentEme.appendChild(childEle);
  position !== "Rahul" && audio.play();
}

const nameu = prompt("Enter your name to join");

socket.emit("new-user-joined", nameu);

socket.on("user-joined", (data) => {
  showOnScreen("Joined", data);
});

socket.on("receive", (data) => {
  showOnScreen("Sandesh", `${data.name}: ${data.message} `);
});
socket.on("left", (data) => {
  showOnScreen("Left", data);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  showOnScreen("Rahul", `You: ${message}`);
  socket.emit("send", message);
  document.getElementById("msg").value = "";
});
