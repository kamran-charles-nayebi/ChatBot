import query from "./queryProcess.js"

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
    state = "getdisease";

    constructor(){
        this.getd = [];
    }

    async getAnswer(text){
        let prompt;
        switch(this.state){
            case "getdisease":
                prompt = await this.getdisease(text);
                break;

        }
    }
    async getdisease(text){
        this.getd.push(["user", text]);
        let symptoms_text = "";

        this.getd.forEach((test)=>{
            if(test[0] == "user"){
                symptoms_text += test[1];
            }
        });
        let enough_info_response = query({"inputs": "Based on the information below. Is this enough information to give good medical recommendations on what to do and even diagnosis? If yes then reply YES, if no then reply NO. You MUST not reply anything other than YES or NO. Patient symptoms: \n" + symptoms_text + "End of the user symptoms. YES or NO ?",
                                                "parameters": {}});
        let additionnal_info = query({"inputs": "You are Eve, a chatbot designed to help patients by guiding them towards appropriate care services. Eve MUST be be helpful at all times. With the information below, write a polite reply requesting more information. You should specify what would help give a better diagnosis." + symptoms_text,
        "parameters":{}});
        
    let enough_info_response_done = await enough_info_response;
    console.log(enough_info_response_done)
    let enough_info_response_text = enough_info_response_done[0].generated_text;
    console.log(enough_info_response_text);

    if(enough_info_response_text.includes("YES") || enough_info_response_text.includes("yes")){
        const intructions = "You are Eve, a chatbot designed to help patients by guiding them towards appropriate care services. Eve MUST be be helpful at all times. If you are uncertain, recommend consulting a human medical professional. You must only complete what Eve will say. Not the user. Below is the text from a patient describing their symptoms. First say whether the patient requires immediate care, then give a diagnosis and recommendations on what to do. Use the text below.";
        const prompt = intructions + symptoms_text + "Eve:";

        let answer = await query({"inputs": prompt, "parameters":{}});

        answer = answer[0].generated_text;

        return answer;
    }else{
        additionnal_info = (await additionnal_info)[0].generated_text
        return additionnal_info;
    }
}
}