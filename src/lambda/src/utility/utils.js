const xml2js = require('xml2js');

const parser = new xml2js.Parser({explicitArray: false});

const parseXmlBody = (xml) => {
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (error, result) => {
      if (error) {
        reject({
          parseError: {
            error: error,
            message: 'xml parse error'
          }
        });
      }

      resolve(result);
    });
  });
};

const getRequiredProps = (obj) => {
  let propsList = [];
  const objectKeys = Object.keys(obj);
  objectKeys.forEach(key => {
    if (obj[key]) {
      propsList.push(key);
    }
  });
  return propsList;
};

const filterByKey = (obj, filter) => {
  return filter.reduce((acc, key) => ({ ...acc, [key]: obj[key]}), {});
  // return Object.keys(obj)
  //   .filter(key => filter.includes(key))
  //   .reduce((acc, key) => ({
  //     ...acc,
  //     ...{[key]: obj[key]}
  //   }), {});
};

// https://medium.com/front-end-weekly/30-seconds-of-code-rename-many-object-keys-in-javascript-268f279c7bfa
const renameKeys = (obj, mapKeys) => {
  return Object.keys(obj)
    .reduce((acc, key) => ({
      ...acc,
      ...{[mapKeys[key] || key]: obj[key]}
    }), {});
};

module.exports = {
  getRequiredProps,
  filterByKey,
  renameKeys,
  parseXmlBody
};