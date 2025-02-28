'use strict'

const path = require("path");


const ParseSteps = require(path.join(process.cwd(),  'src', 'jobs', 'ParseSteps'));

async function main() {


    const text = `
[STEP_1]
Identify the specific SOL requirements you need to research (e.g., its definition, purpose, hierarchy, and access controls).
[/STEP_1]
[STEP_2]
List credible sources where detailed information about SOL can be found, such as DoD publications or reputable websites.
[/STEP_2]
[STEP_3]
Gather accurate and relevant information from one specified source on aspects like SOL's structure and access policies.
[/STEP_3]
[STEP_4]
Prepare the content of your email with a clear, concise summary of SOL requirements and the gathered data.
[/STEP_4]
[STEP_5]
Identify who should receive the email based on your organizational structure or project needs.
[/STEP_5]
[STEP_6]
Compose an email subject line that clearly states the purpose of the email, such as "Summary of SOL Requirements."
[/STEP_6]
[STEP_7]
Write the body of the email, explaining SOL in detail and providing all necessary information.
[/STEP_7]
[STEP_8]
Format the email professionally, ensuring clarity and a clear tone without markdown.
[/STEP_8]
[STEP_9]
Send the pre-composed and formatted email to the identified recipients using a reliable method (e.g., email client or service).
[/STEP_9]`;


    let result = ParseSteps(text);

    for(const task of result){
console.log(task);
    }


}

main()