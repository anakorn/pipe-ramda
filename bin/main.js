#!/usr/bin/env node

const vm = require('vm');
const ramda = require('ramda');
const program = require('commander');

program
    .version('1.0.0')
    .usage('<script>')
    .arguments('<script>')
    .action(main)
    .parse(process.argv);

if (typeof theScript === 'undefined') {
    program.outputHelp();
    process.exit(1);
}

async function main(script) {
    theScript = script;
    try {
        let input;
        if (false) {
            // TODO: if stream, concat chunks
        } else {
            input = await require('get-stdin')();
        }
        console.log(invokeScript(script, JSON.parse(input)));
    } catch (e) {
        console.error(e);
    }
}

function invokeScript(script, input) {
    const context = vm.createContext({
        _: ramda,
    });
    const fn = vm.runInContext(script, context);
    if (typeof fn !== 'function') {
        throw new Error('script must return function');
    }
    return fn(input);
}
