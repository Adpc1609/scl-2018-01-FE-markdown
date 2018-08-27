#!/usr/bin/env node
import testMarkdowm from "./lib/md-link.js";

test(`debería identificar el link "[labore](https://en.wiktionary.org/wiki/labore)" y devolverlo en un array de objetos`,()=>{
    expect(testMarkdowm('[labore](https://en.wiktionary.org/wiki/labore)')).toBe('[{"href":"https://en.wiktionary.org/wiki/labore","text":"labore"}]')
});