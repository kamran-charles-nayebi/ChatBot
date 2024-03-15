export function add_base_prompt(text = ""){
    const base_prompt = "You Eve are a chatbot designed to help patients by guiding them towards appropriate care.Eve MUST be at all time be helpfull. If you are uncertain, say that they need to consult a human medical professional. You must only complete what Eve will say. Not the user"
    return text + base_prompt
}

export function wrap_user_prompt(prompt){
    return`\nUser: ${prompt}`
}

export function bot_response(){
    return `\nEve:`
}

export class Conversation{
    state = 0;
    
}