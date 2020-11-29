const ActionCable = require('actioncable');

const consumer = createConsumer('ws://localhost:3000/cable');

const chatChannel = consumer.subscriptions.create({ channel: "ChatChannel" }, {
    received(data) {
      this.appendLine(data)
    },
   
    appendLine(data) {
      const html = this.createLine(data)
      const element = document.querySelector("[data-chat-room='Best Room']")
      element.insertAdjacentHTML("beforeend", html)
    },
   
    createLine(data) {
      return `
        <article class="chat-line">
          <span class="message">${data["body"]}</span>
        </article>
      `
    }
});

function sendMessage() {
    const messageContent = document.getElementById("message-input").value;
    chatChannel.send({ message: messageContent });
};