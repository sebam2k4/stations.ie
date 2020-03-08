'use strict';

const xml2js = require('xml2js');

const xml2jsParserOptions = {
  explicitArray: false
};

const parser = new xml2js.Parser(xml2jsParserOptions);

const parseXmlBody = (xml) => {
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (error, result) => {
      if (error) {
        reject({
          error: {
            statusText: 'xml parse error',
            details: error
          }
        });
      }
      resolve(result);
    });
  });
};

const getPropsToFilter = (obj) => {
  return Object.keys(obj).map(key => {
    if (obj[key]) {
      return key;
    }
  });
};

const filterByKeys = (obj, filter) => {
  return filter.reduce((acc, key) => ({
    ...acc, [key]: obj[key]
  }), {});

  // return Object.keys(obj)
  //   .filter(key => filter.includes(key))
  //   .reduce((acc, key) => ({
  //     ...acc,
  //     ...{[key]: obj[key]}
  //   }), {});
};

// https://medium.com/front-end-weekly/30-seconds-of-code-rename-many-object-keys-in-javascript-268f279c7bfa
const renameKeys = (obj, keysMapping) => {
  return Object.keys(obj)
    .reduce((acc, key) => ({
      ...acc,
      ...{[keysMapping[key] || key]: obj[key]}
    }), {});
};

const checkFetchResponseStatus = (res) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject({
      error: {
        statusCode: res.status,
        statusText: res.statusText
      }
    });
  }
};

const checkRtpiApiResponseErrorCodes = (json) => { // for buseireann
  // RTPI REST API error codes:
  // 0 Success
  // 1 No Results
  // 2 Missing Parameter
  // 3 Invalid Parameter
  // 4 Scheduled Downtime
  // 5 Unexpected System Error
  if (json.errorcode == 0 || json.errorcode == 1) {
    return json;
  }

  let statusCode;
  if (json.errorcode == 2 || json.errorcode == 3) {
    statusCode = 500;
  } else {
    statusCode = 502;
  }

  const details = {
    rtpiErrorCode: json.errorcode,
    rtpiErrorMessage: json.errormessage,
  };

  return Promise.reject({
    error: {
      statusCode,
      details
    }
  });
};

const sortObjectsByKey = (arrObjs, key) => {
  return arrObjs.sort((a, b) => {
    let valueA = a[key].toLowerCase();
    let valueB = b[key].toLowerCase();
    if (valueA < valueB) {
      return -1;
    }

    if (valueA > valueB) {
      return 1;
    }

    return 0;
  });
};

module.exports = {
  getPropsToFilter,
  filterByKeys,
  renameKeys,
  checkFetchResponseStatus,
  checkRtpiApiResponseErrorCodes,
  sortObjectsByKey,
  parseXmlBody
};
