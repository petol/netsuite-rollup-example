import typescript from '@rollup/plugin-typescript'
import wildcardExternal from '@oat-sa/rollup-plugin-wildcard-external'
import cleanup from 'rollup-plugin-cleanup'


/**
 * ADD NETSUITE ENTRY POINT SCRIPTS IN entries BELOW
 *  {input: filepath, type: scripttype, version?: suitescript version, scope?: modulescope, outputSubdir?: subfolder to place file in}
 */
const entries = [
  { input: 'src/example1-csue/clientscript_test.ts', type: 'clientScript'},
  { input: 'src/example1-csue/userevent_test.ts', type: 'userEvent', version: '2.1', outputSubDir: 'userEvents'},
  { input: 'src/example2-suitelet/suitelet-entrypoint.ts', type: 'Suitelet', version: '2.1', outputSubDir: 'suitelet'}
]

/**
 * Builds a Netsuite JSDoc Banner
 * @param {string} type 
 * @param {string} version 
 * @param {string} scope 
 */
function buildNetSuiteBanner(type, version, scope) {
  if (!scope) {
    scope = 'Public'
  }
  if (!version) {
    version = '2.x'
  }
  if (!type) {
    throw `Missing Type`
  }
  return `/**\n*@NApiVersion ${version}\n*@NModuleScope ${scope}\n*@NScriptType ${type}\n*/`
}


// Shared Configuration
const pluginConfiguration = [
  typescript(),
  wildcardExternal([
    // Exclude all modules from NetSuite
    'N/**',
  ]),
  cleanup(),
]

// Build a config entry for Rollup for Each file in entries
function getAllEntries() {
  const r = []
  for (const entry of entries) {
    r.push({
      input: entry.input,
      plugins: pluginConfiguration,
      output: {
        dir: `dist/FileCabinet/SuiteScripts/${entry.outputSubDir? entry.outputSubDir: ''}`,
        format: 'amd', // <- Must be amd for NetSuite Compatibility
        banner: buildNetSuiteBanner(entry.type, entry.version, entry.scope),
        strict: false,
      },
    })
  }
  return r
}

export default getAllEntries()
