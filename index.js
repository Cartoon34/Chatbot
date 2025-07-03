// frontend/chat.js
async function sendMessage() {
  const input = document.getElementById('userInput').value;
  const chatLog = document.getElementById('chatLog');

  chatLog.value += "You: " + input + "\n";

  const response = await fetch('http://localhost:8000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });

  const data = await response.json();
  chatLog.value += "Bot: " + data.response + "\n";

  document.getElementById('userInput').value = "";
}
