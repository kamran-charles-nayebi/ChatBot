import {Conversation} from "./queryManip.js";

const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');

const cv = new Conversation();


appendMessage('bot', 'Hello, I am a chatbot who will try to redirect you to the proper medical services. Any diagnosis that comes from our conversation is for illustrative purposes only and if you have doubts, please see a human professional. Start by describing your symptoms.');

chatForm.addEventListener('submit', async (event) =>  {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  appendMessage('user', text);
  chatInput.value = '';
  const textResponse = await cv.getAnswer(text);

  appendMessage('bot', textResponse);
});

function appendMessage(side, text) {
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
