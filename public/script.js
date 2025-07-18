// function sendMessage() {
//   const input = document.getElementById("user-input");
//   const chatBox = document.getElementById("chat-box");
//   const userMessage = input.value.trim();

//   if (userMessage === "") return;

//   // User message
//   const userMsgDiv = document.createElement("div");
//   userMsgDiv.classList.add("message", "user-message");
//   userMsgDiv.innerText = userMessage;
//   chatBox.appendChild(userMsgDiv);

//   // Clear input
//   input.value = "";

//   // Bot response (dummy)
//   const botMsgDiv = document.createElement("div");
//   botMsgDiv.classList.add("message", "bot-message");
//   botMsgDiv.innerText = "Gemini is thinking... (this is dummy response)";
  
//   setTimeout(() => {
//     chatBox.appendChild(botMsgDiv);
//     chatBox.scrollTop = chatBox.scrollHeight;
//   }, 500);
// }

// // Add this to your frontend JavaScript file

// document.getElementById('chatForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const userInput = document.getElementById('userInput').value;

//     const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ message: userInput })
//     });

//     const data = await response.json();
//     document.getElementById('chatReply').textContent = data.reply;
// });

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();

  if (userMessage === "") return;

  // Tampilkan pesan pengguna
  const userMsgDiv = document.createElement("div");
  userMsgDiv.classList.add("message", "user-message");
  userMsgDiv.innerText = userMessage;
  chatBox.appendChild(userMsgDiv);

  // Bersihkan input
  input.value = "";

  // Tampilkan status bot sedang berpikir
  const botMsgDiv = document.createElement("div");
  botMsgDiv.classList.add("message", "bot-message");
  botMsgDiv.innerText = "Gemini is thinking...";
  chatBox.appendChild(botMsgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Kirim ke backend
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    botMsgDiv.innerText = data.reply;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    botMsgDiv.innerText = "Terjadi kesalahan. Silakan coba lagi.";
  }
}

// Pastikan form memanggil sendMessage saat submit
document.getElementById('chatForm').addEventListener('submit', function(e) {
  e.preventDefault();
  sendMessage();
});
