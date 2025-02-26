

module.exports =  function (text) {
    const toolNameMatch = text.match(/tool_name=(\w+)/);
    const paramMatches = [...text.matchAll(/name=(\w+)\|value="([^"]+)"/g)];

    const toolName = toolNameMatch ? toolNameMatch[1] : "";

    const toolParams = paramMatches.reduce((acc, match) => {
        acc[match[1]] = match[2];
        return acc;
    }, {});

    return {
        tool_name: toolName,
        tool_params: toolParams
    };
}