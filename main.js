document.addEventListener("DOMContentLoaded", () => {
  const botInput = document.getElementById("bot-input");
  const botButton = document.getElementById("send-button");
  const botContentMessages = document.getElementById("bot-content-messages");
  const automatedResponse = "I am not working";
  const replyDelay = 2000;

  const brightnessBtn = document.getElementById("brightness-toggle");
  brightnessBtn.addEventListener("click", toggleBrightness);

  botButton.addEventListener("click", () => {
    const message = botInput.value.trim();
    if (message) {
      addMessageToTheContentBot(message);
      clear(botInput);
    }
  });

  loadMessages();

  function toggleBrightness() {
    document.body.classList.toggle("light-theme");
    showLoading();
  }

  function loadMessages() {
    const messages = getFromLocalStorage();
    showLoading();
    messages.forEach((message) => {
      addMessageToTheContentBot(message, false);
      addAutomatedResponse();
    });
  }

  function addMessageToTheContentBot(message, save = true, reply = false) {
    const botContentMessageDiv = document.createElement("div");
    botContentMessageDiv.classList.add("bot-content-message");

    const messageTextDiv = document.createElement("div");
    messageTextDiv.classList.add("message-text");

    // Add image only for regular messages, not replies
    if (!reply) {
      const imgElement = document.createElement("img");
      imgElement.src =
        "https://th.bing.com/th/id/OIF.xiSw5iPHcqcIhow0dj0aLg?rs=1&pid=ImgDetMain";
      imgElement.classList.add("message-img");
      imgElement.classList.add("img-thumbnail");
      messageTextDiv.appendChild(imgElement);
    }

    const textNode = document.createTextNode(message);
    messageTextDiv.appendChild(textNode);

    botContentMessageDiv.appendChild(messageTextDiv);

    if (reply) {
      botContentMessageDiv.classList.add("reply");
    } else {
      const messageActionsDiv = document.createElement("div");
      messageActionsDiv.classList.add("message-actions");

      const messageCpyBtn = createBtn("cpy", message);
      const messageDeleteBtn = createBtn("delete", message);

      messageActionsDiv.appendChild(messageCpyBtn);
      messageActionsDiv.appendChild(messageDeleteBtn);

      botContentMessageDiv.appendChild(messageActionsDiv);
    }

    botContentMessages.appendChild(botContentMessageDiv);
    botContentMessageDiv.scrollIntoView({ behavior: "smooth" });

    if (save) {
      saveTheContent(message);
      showLoading();
      setTimeout(() => {
        addAutomatedResponse();
      }, replyDelay);
    }
  }

  function showLoading() {
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("loading");
    botContentMessages.appendChild(loadingDiv);
    loadingDiv.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      botContentMessages.removeChild(loadingDiv);
    }, replyDelay);
  }

  function createBtn(type, message) {
    const messageBtn = document.createElement("button");

    if (type === "cpy") {
      messageBtn.classList.add("copy-message-btn");
      messageBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
            </svg>`;
      messageBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(message);
      });
    } else if (type === "delete") {
      messageBtn.classList.add("delete-message-btn");
      messageBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-8zM14 3a1 1 0 0 1-1-1V1a1 1 0 0 1-1-1H4a1 1 0 0 1-1 1v1a1 1 0 0 1-1 1H1v1h14V3zM4.5 3V2h7v1h-7zM6 1h4v1H6V1z"/>
            </svg>`;
      messageBtn.addEventListener("click", () => {
        botContentMessages.removeChild(messageBtn.parentElement.parentElement);
        removeFromStorage(message);
      });
    }

    return messageBtn;
  }

  function removeFromStorage(message) {
    let messages = getFromLocalStorage();
    messages = messages.filter((msg) => msg !== message);
    addIntoLocalStorage(messages);
  }

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
    const messages = getFromLocalStorage();
    messages.push(message);
    addIntoLocalStorage(messages);
  }

  function addAutomatedResponse() {
    addMessageToTheContentBot(automatedResponse, false, true);
  }
});
