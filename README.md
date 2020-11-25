# NetSuite RollupJS + TypeScript Example Setup
This Project is an example of how RollupJS and TypeScript can be used for NetSuite Development. 
For more information about TypeScript and RollupJS see https://www.typescriptlang.org/ and https://rollupjs.org respectively. 

The Project uses 3 TypeScript files (1 ClientScript, 1 UserEvent and 1 Library) to Compile into 2 NetSuite compatible SuiteScript (.js) files

# Getting Started
First Install Node and NPM & in a terminal run: 
  1. ```npm install```
  2. ```npm run build```

Output SuiteScript files should now be viewable in the ```dist``` folder

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
