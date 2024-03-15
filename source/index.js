import query from "./queryProcess.js";
import { add_base_prompt, wrap_user_prompt, bot_response } from "./queryManip.js";

const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');


appendMessage('bot', 'Hello, I am a chatbot who will try to redirect you to the proper medical services. Any diagnosis that comes from our conversation is for illustrative purposes only and if you have doubts, please see a human professional. Start by describing your symptoms.');

chatForm.addEventListener('submit', async (event) =>  {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  chatInput.value = '';

  const prompt = add_base_prompt() + wrap_user_prompt(text) + bot_response();

  console.log(prompt);

  const response = await query({
    inputs: prompt,
    parameters:{}
  });

  const textResponse = response[0].generated_text;
  console.log(textResponse)

  appendMessage('bot', textResponse);
});

function appendMessage(side, text) {
  console.log("append MEssage");
  const bubble = `
    <div class="msg -${side}">
        <div class="bubble">${text}</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', bubble);
  chatBox.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}
