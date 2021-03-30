const socket = io();
const msgText = document.querySelector("#msg");
const button = document.querySelector("button");
const chatBox = document.querySelector(".chat-content");
const displayMsg = document.querySelector(".message");

let name;

do{
  name = prompt("Enter your name: ");
} while(!name);

document.querySelector("#your-name").textContent = name;
msgText.focus();

button.addEventListener("click", (e) => {
   e.preventDefault();
   sendMessage(msgText.value);
   msgText.value = "";
   msgText.focus();
   chatBox.scrollTop = chatBox.scrollHeight;
   
});

const sendMessage = (txt) => {
  let text = {
    user: name,
    message: txt.trim()
  }
  
  display(text, "you-message");
  
  socket.emit("sendMessage", text);
}

socket.on("sendToAll", text => {
   display(text, "other-message");
   chatBox.scrollTop = chatBox.scrollHeight;
});


const display = (text, type) => {
  const div = document.createElement("div");
  let className = type;
  div.classList.add(className, "message-row");
  let times = new Date().toLocaleTimeString();
  
  let innerText = `
     <div class="message-title">
      <sapn> ${text.user}</span>
        </div>
          <div class="message-text">
             ${text.message}
          </div>
         <div class="message-time">
           ${times}
     </div>
  `;
  
  div.innerHTML = innerText;
  displayMsg.append(div);
}



















