/* eslint-disable no-console */

const app = require('./src/stations-express');
const config = require('./src/config/config');

app.listen(`${config.localDevPort}`, '127.0.0.1', () => {
  console.log(`Starting local app on port ${config.localDevPort}...`);
  console.log(`live at http://127.0.0.1:${config.localDevPort}/${config.functionsPath}/${config.functionName}/stations`);
});
