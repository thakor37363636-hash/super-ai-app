const API_TOKEN = "hf_your_real_token_here"; // Paste your Hugging Face token
const API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large";

async function sendMsg() {
  let input = document.getElementById("userInput");
  let chatBox = document.getElementById("chatBox");
  if (input.value === "") return;

  const userText = input.value;
  chatBox.innerHTML += "<p><b>You:</b> " + userText + "</p>";
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  chatBox.innerHTML += "<p><i>AI typing...</i></p>";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: userText })
    });

    const data = await response.json();
    const aiText = data[0]?.generated_text || "AI response nathi aavyo.";

    chatBox.innerHTML = chatBox.innerHTML.replace("<p><i>AI typing...</i></p>", "");
    chatBox.innerHTML += "<p><b>AI:</b> " + aiText + "</p>";
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    chatBox.innerHTML += "<p><b>AI:</b> Error aavyo. Thodi vaar pachi try karo.</p>";
  }
}
