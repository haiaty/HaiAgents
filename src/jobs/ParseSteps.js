

module.exports =  function (stepsText) {

    //===========================
    //
    //===========================
    const steps = [];

    //===========================
    //
    //===========================
    const regex = /\[STEP_(\d+)]\n([\s\S]*?)\n\[\/STEP_\1]/g;


    //===========================
    //
    //===========================
    let match;
    while ((match = regex.exec(stepsText)) !== null) {
        steps.push({
            step: parseInt(match[1], 10),
            task: match[2].trim()
        });
    }

    //===========================
    // Comment here
    //===========================
    return steps.sort((a, b) => a.step - b.step).map(s => s.task);
}