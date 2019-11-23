const ErrorHandler = require ('./errorHandlers');

describe('ErrorHandlers.js', () => {
  describe('#reqError', () => {
    it('should return a response error object containing error info, message, and 502 status when IrishRail api response status is not OK', () => {
      const mockError = {
        statusError: {
          message: 'Internal Server Error',
          error: 500
        }
      };

      const expected = {
        resStatus: 502,
        checkStatusError: mockError.statusError,
        message: `Did not receive 200 response from Irish Rail Api. Received ${mockError.statusError.error} instead`
      };

      const result = ErrorHandler.reqError(mockError);
      expect(result).toEqual(expected);
    });

    it('should return a response error object containing error info, message, and 500 status when xml parsing error', () => {
      const mockError = {
        xmlParseError: {
          message: 'xml parse error',
          error: null
        }
      };

      const expected = {
        resStatus: 500,
        xmlParseError: mockError.xmlParseError,
        message: 'Error while parsing XML data'
      };

      const result = ErrorHandler.reqError(mockError);
      expect(result).toEqual(expected);
    });

    it('should return a response error object containing error info, message, and 500 status when system error', () => {
      const mockError = {
        error: {},
        type: 'system'
      };

      const expected = {
        resStatus: 500,
        systemError: mockError,
        message: 'NodeJS system type error'
      };

      const result = ErrorHandler.reqError(mockError);
      expect(result).toEqual(expected);
    });

    it('should return a response error object containing error info, message, and 500 status when unexpected error', () => {
      const mockError = {
        error: {}
      };

      const expected = {
        resStatus: 500,
        genericError: mockError,
        message: 'Unexpected error occured'
      };

      const result = ErrorHandler.reqError(mockError);
      expect(result).toEqual(expected);
    });
  });
});
