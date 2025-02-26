

const { DuckDuckGoSearch: Duckduckgo_search } =  require("@langchain/community/tools/duckduckgo_search");

module.exports =  async function duckduckgo_search(params) {

    // Instantiate the DuckDuckGoSearch tool.
    const tool = new Duckduckgo_search({ maxResults: params.maxResults });

// Get the results of a query by calling .invoke on the tool.
    const result = await tool.invoke(
        params.textToSearch
    );

    return result;
}