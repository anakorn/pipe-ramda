#!/usr/bin/env node

const vm = require('vm');
const ramda = require('ramda');
const program = require('commander');

const eval = function eval(str) {
    return vm.runInContext(str, vm.createContext({
        ...ramda
    }));
}

const main = async function main(script) {
    theScript = script;
    try {
        const fn = eval(script);
        if (typeof fn !== 'function') {
            throw new Error('script must return function');
        }
        const stdin = await require('get-stdin')();
        if (stdin === '') {
            throw new Error('no data provided');
        }
        const res = fn(JSON.parse(stdin));
        console.log(JSON.stringify(res, null, 4));
    } catch (e) {
        console.error(e);
    }
}

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
