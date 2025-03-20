
'use strict'
const path = require("path");
const EmitEvent = require(path.join(process.cwd(), 'src', 'jobs', 'EmitEvent'));

module.exports =  async function (llm_configs) {


    await EmitEvent('[running] defininf ExtracTextFromChunk strategy');

    try {

        let llm_provider = llm_configs.provider;

        let pathToRequire = path.join(process.cwd(), 'llmproviders', llm_provider, 'ExtractTextFromStreamChunk')

        await EmitEvent('[info] path to require: ' +  pathToRequire);

        let choosenStrategy = require(pathToRequire);

        await EmitEvent('[finished] ExtracTextFromChunk strategy defined', {'strategy': choosenStrategy});

        return choosenStrategy;


    } catch (e) {

        await EmitEvent('[ERROR] ExtracTextFromChunk strategy definition had error', {'error': e.message});
        throw e;

    }


}