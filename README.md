# NetSuite RollupJS + TypeScript Example Setup
This Project is an example of how RollupJS and TypeScript can be used for NetSuite Development. 
For more information about TypeScript and RollupJS see https://www.typescriptlang.org/ and https://rollupjs.org respectively. 

The Project uses 3 TypeScript files (1 ClientScript, 1 UserEvent and 1 Library) to Compile into 2 NetSuite compatible SuiteScript (.js) files

# Getting Started
First Install Node and NPM & in a terminal run: 
  1. ```npm install```
  2. ```npm run build```

Output SuiteScript files should now be viewable in the ```dist``` folder

# What does it Acctually do?
It takes your typescript files, compiles them and bundles the code so that all dependencies lies within one file. 
For example in ```src/example2-suitelet``` we have a suitelet which uses 2 files:

*suitelet-entrypoint.ts*
```javascript
import { EntryPoints } from 'N/types'
import * as https from 'N/https'
import { buildForm } from './buildform'

function onRequest(ctx: EntryPoints.Suitelet.onRequestContext) {
  if (ctx.request.method === https.Method.GET) {
    const name = ctx.request.parameters.name || 'Person'
    const form = buildForm({ name })
    ctx.response.writePage(form)
  } else {
    throw 'Method Not Yet Implemented'
  }
}

export {onRequest}
```

*buildform.ts*
```javascript
import * as ui from 'N/ui/serverWidget'

interface createFormOptions {
  name: string
}

function buildForm(opt: createFormOptions): ui.Form {
  const f = ui.createForm({ title: 'Hello', hideNavBar: false })
  const nf = f.addField({
    id: 'custpage_field',
    label: 'Sample Field',
    type: ui.FieldType.TEXT,
  })
  nf.defaultValue = `Hello ${opt.name}!`
  nf.updateDisplayType({ displayType: ui.FieldDisplayType.INLINE })
  return f
}

export { buildForm }
```

And when compiled turns the typescript into 1 NetSuite Compatible File:
```javascript
/**
*@NApiVersion 2.1
*@NModuleScope Public
*@NScriptType Suitelet
*/
define(['exports', 'N/https', 'N/ui/serverWidget'], function (exports, https, ui) {

    function buildForm(opt) {
        var f = ui.createForm({ title: 'Hello', hideNavBar: false });
        var nf = f.addField({
            id: 'custpage_field',
            label: 'Sample Field',
            type: ui.FieldType.TEXT,
        });
        nf.defaultValue = "Hello " + opt.name + "!";
        nf.updateDisplayType({ displayType: ui.FieldDisplayType.INLINE });
        return f;
    }

    function onRequest(ctx) {
        if (ctx.request.method === https.Method.GET) {
            var name_1 = ctx.request.parameters.name || 'Person';
            var form = buildForm({ name: name_1 });
            ctx.response.writePage(form);
        }
        else {
            throw 'Method Not Yet Implemented';
        }
    }

    exports.onRequest = onRequest;

    Object.defineProperty(exports, '__esModule', { value: true });

});
```
# Why is this Good?
- [X] It allows you to always use the latest ES version no matter if NetSuite has implemented it yet
- [X] It simplifies code reusability while at the same time ensure that you're file has no external dependencies in the NetSuite Filecabinet that may conflict.
- [X] It allows you to use modern Javascript frameworks such as TypeScript
- [ ] It potentially allows you to bundle NPM modules into NetSuite (Warning: This should be done very carefully but has been shown to work with Webpack)

# I want to test adding my own file
1. Create a ```.ts```file in the ```src/```directory
2. Example NetSuite typeScript code can be found in the Netsuite-types repo (https://github.com/headintheclouddev/typings-suitescript-2.0)
3. Add an Entry in ```entries```in ```rollup.config.js```
4. Run ```npm run build```
5. Your file should now have been compiled into the ```dist``` folder

# Acknowledgements
This Project uses Head in the Cloud Development's excellent NetSuite TypeScript types (https://github.com/headintheclouddev/typings-suitescript-2.0)
and draws inspiration from Michoel Chaikins NetSuite Webpack PoC (https://github.com/michoelchaikin/netsuite-webpack) which does similiar things but with webpack! :)

# Future Improvements
- [ ] Add NetSuites SDFCLI for Node to the Project
- [ ] Test the Code in Netsuite :D
