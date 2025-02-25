
module.exports =  function (placeholder, newText, content) {

    const regex = new RegExp(placeholder, 'g');
    return content.replace(regex, newText);
}