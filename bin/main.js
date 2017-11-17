#!/usr/bin/env node

const vm = require('vm');
const ramda = require('ramda');
const program = require('commander');

program
    .version('1.0.0')
    .usage('<script>')
    .parse(process.argv);

const script = program.script;

if (typeof script === 'undefined') {
    program.outputHelp();
    process.exit(1);
}

(async function exec() {
    const raw = await require('get-stdin')();
    let input;
    try {
        input = JSON.parse(raw);
        const context = vm.createContext({
            _: ramda,
        });
        const fn = vm.runInContext(script, context);
        if (typeof fn !== 'function') {
            throw new Error('script must return function');
        }
        console.log(fn(input));
    } catch (e) {
        console.error(e);
    }
})();
