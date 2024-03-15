import query from "./queryProcess.js"; 

const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');


appendMessage('bot', 'This is a bot bubble');

chatForm.addEventListener('submit', async (event) =>  {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  chatInput.value = '';

  const response = await query({
    inputs: text,
    parameters:{}
  });

  appendMessage('bot', response);
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
