document.addEventListener("DOMContentLoaded", () => {
  const botInput = document.getElementById("bot-input");
  const botButton = document.getElementById("send-button");
  const botContentMessages = document.getElementById("bot-content-messages");

  function addIntoLocalStorage(messages) {
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("messages")) || [];
  }
});
