'use strict';

class ErrorHandler {
  static reqError(error) {
    if (error.statusError) {
      return {
        resStatus: 502,
        checkStatusError: error.statusError,
        message: `Did not receive 200 response from Irish Rail Api. Received ${error.statusError.error} instead`
      };
    }
  
    if (error.xmlParseError) {
      return {
        resStatus: 500,
        xmlParseError: error.xmlParseError,
        message: 'Error while parsing XML data'
      };
    }
  
    if (error.type === 'system') {
      return {
        resStatus: 500,
        systemError: error,
        message: 'NodeJS system type error'
      };
    }
  
    return {
      resStatus: 500,
      genericError: error,
      message: 'Unexpected error occured'
    };
  }
}

module.exports = ErrorHandler;
