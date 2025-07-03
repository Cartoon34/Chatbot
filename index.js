async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");

  // Show user message
  chatBox.innerHTML += `<div class="message user"><strong>You:</strong> ${message}</div>`;
  input.value = "";

  // Typing indicator
  const typing = document.createElement("div");
  typing.className = "message bot typing";
  typing.textContent = "Bot is typing...";
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Send to backend
  const response = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message })
  });

  const data = await response.json();
  typing.remove();

  // Show bot response
  chatBox.innerHTML += `<div class="message bot"><strong>Bot:</strong> ${data.response}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
