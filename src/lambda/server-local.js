/* eslint-disable no-console */
const app = require('./src/server');
const open = require('open');

const config = require('./src/config/config');

app.listen(3000, '127.0.0.1', () => {
  console.log('Starting local app on port 3000...');
  console.log(`opening http://127.0.0.1:${config.localDevPort}/${config.lambdaPath}`);
  open(`http://127.0.0.1:${config.localDevPort}/${config.lambdaPath}`);
});

