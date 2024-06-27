document.addEventListener("DOMContentLoaded", () => {
  const botInput = document.getElementById("bot-input");
  const botButton = document.getElementById("send-button");
  const botContentMessages = document.getElementById("bot-content-messages");

  // Loading Messages
  loadMessages();

  function loadMessages(){
    const messages = getFromLocalStorage();
    
    messages.forEach(message => {
        addMessageToTheContentBot(message, false);
    });
  }

  function addMessageToTheContentBot(message, save = true) {
    const botContentMessageDiv = document.createElement("div");
    botContentMessageDiv.classList.add("bot-content-message");
    botContentMessageDiv.innerHTML = message;

    const messageCpyDiv = document.createElement("div");
    messageCpyDiv.classList.add("message-actions");

    const messageCpyBtn = document.createElement("button");
    messageCpyBtn.classList.add("copy-message-btn");
    messageCpyBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
            </svg>
        `;
    messageCpyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(message);
    });

    messageCpyDiv.appendChild(messageCpyBtn);
    botContentMessageDiv.appendChild(messageCpyDiv);
    botContentMessages.appendChild(botContentMessageDiv);

    if (save) {
        saveTheContent(message);
    }
  }

  // When click send
  botButton.addEventListener("click", () => {
    const message = botInput.value.trim();
    if (message) {
      addMessageToTheContentBot(message);
      clear(botInput);
    }
  });

  function addIntoLocalStorage(messages) {
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("messages")) || [];
  }

  function clear(target) {
    target.value = "";
  }

  function saveTheContent(message) {
    const messages = getFromLocalStorage("messages");
    messages.push(message);
    addIntoLocalStorage(messages);
  }
});
