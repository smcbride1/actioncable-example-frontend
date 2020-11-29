const ActionCable = require('actioncable');
const consumer = ActionCable.createConsumer('ws://localhost:3000/cable');

document.getElementById("message-send-button").addEventListener("click", sendMessage);

const chatChannel = consumer.subscriptions.create({ channel: "ChatChannel" }, {
    received(data) {
      this.appendLine(data)
    },
   
    appendLine(data) {
      const messageContainer = document.getElementById("messages-container");
      const message = document.createElement("li");
      message.innerText = data["message"];
      console.log(data["message"]);
      messageContainer.appendChild(message)
    }
});

function sendMessage() {
    console.log("Message sent");
    const messageContent = document.getElementById("message-input").value;
    chatChannel.send({ message: messageContent });
};