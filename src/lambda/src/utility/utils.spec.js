const Utils = require ('./utils');
// const xml2js = require('xml2js');
// jest.mock('xml2js', () => {
//   return {
//     parseString: jest.fn().mockImplementation(() => 'parsedXml')
//   };
// });

describe('Utils.js', () => {
  describe('#sortObjectsByKey', () => {
    it('should sort objects in alphabetical ascending order by given key', () => {
      const mockUnorderedData = [
        {name: 'Steve', street: 'First'},
        {name: 'John', street: 'Second'},
        {name: 'Alice', street: 'Third'},
        {name: 'William', street: 'Fourth'},
      ];

      const expectedOrderByName = [
        {name: 'Alice', street: 'Third'},
        {name: 'John', street: 'Second'},
        {name: 'Steve', street: 'First'},
        {name: 'William', street: 'Fourth'},
      ];
      const expectedOrderByStreet = [
        {name: 'Steve', street: 'First'},
        {name: 'William', street: 'Fourth'},
        {name: 'John', street: 'Second'},
        {name: 'Alice', street: 'Third'},
      ];

      const resultByName = Utils.sortObjectsByKey(mockUnorderedData, 'name');
      expect(resultByName).toEqual(expectedOrderByName);

      const resultByStreet = Utils.sortObjectsByKey(mockUnorderedData, 'street');
      expect(resultByStreet).toEqual(expectedOrderByStreet);
    });

    it('should sort objects in alphabetical ascending order correctly with duplicate values ', () => {
      const mockUnorderedData = [
        {name: 'Steve', street: 'First'},
        {name: 'Steve', street: 'Second'},
        {name: 'Alice', street: 'Third'},
        {name: 'Alice', street: 'Fourth'},
        {name: 'William', street: 'Fifth'},
      ];

      const expectedOrderByName = [
        {name: 'Alice', street: 'Third'},
        {name: 'Alice', street: 'Fourth'},
        {name: 'Steve', street: 'First'},
        {name: 'Steve', street: 'Second'},
        {name: 'William', street: 'Fifth'},
      ];

      const result = Utils.sortObjectsByKey(mockUnorderedData, 'name');
      expect(result).toEqual(expectedOrderByName);
    });
  });

  describe('#getPropsToFilter', () => {
    it('should get Required Props', () => {
      const mockObj = {
        prop1: true,
        prop2: false,
        prop3: true,
        prop4: false
      };

      const expected = ['prop1', 'prop3'];

      const result = Utils.getPropsToFilter(mockObj);
      expect(result).toEqual(expected);
    });
  });

  describe('#filterByKey', () => {
    it('should filter an object by keys', () => {
      const mockObj = {
        name: 'Jack',
        city: 'Galway',
        street: 'Fist',
        country: 'Ireland'
      };
      const mockKeysToFilter = ['name', 'street'];

      const expected = {
        name: 'Jack',
        street: 'Fist'
      };

      const result = Utils.filterByKeys(mockObj, mockKeysToFilter);
      expect(result).toEqual(expected);
    });

    it('should filter an object by keys', () => {
      const mockObj = {
        name: 'Jack',
        city: 'Galway',
        street: 'Fist',
        country: 'Ireland'
      };
      const mockKeysToFilter = ['name', 'street', 'test'];

      const expected = {
        name: 'Jack',
        street: 'Fist'
      };

      const result = Utils.filterByKeys(mockObj, mockKeysToFilter);
      expect(result).toEqual(expected);
    });
  });

  describe('#renameKeys', () => {
    it('should rename keys based on given mapping', () => {
      const mockObj = {
        WeirdKey: 'value1',
        UPPERCASE: 'value2',
        hELLo: 'value3',
        noRenameNeeded: 'value4'
      };
      const mockMapping = {
        WeirdKey: 'weirdKey',
        UPPERCASE: 'lowercase',
        hELLo: 'helloWorld'
      };

      const expected = {
        weirdKey: 'value1',
        lowercase: 'value2',
        helloWorld: 'value3',
        noRenameNeeded: 'value4'
      };

      const result = Utils.renameKeys(mockObj, mockMapping);
      expect(result).toEqual(expected);
    });
  });

  describe('#checkResposeStatus', () => {
    it('should return response when response status is ok', () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK'
      };

      const result = Utils.checkResponseStatus(mockResponse);
      expect(result).toBe(mockResponse);
    });

    it('should return a Promise that is rejected with a message object when response status is not ok', () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      };

      const expectedError = {
        statusError: {
          error: mockResponse.status,
          message: mockResponse.statusText
        }
      };

      const result = Utils.checkResponseStatus(mockResponse);
      expect.assertions(1);
      return expect(result).rejects.toEqual(expectedError);

    });
  });

  // describe('#parseXmlBody', () => {
  //   it('should return parsed xml', () => {
  //     // const xml = '<ok></ok>';
  //     // new xml2js.parseString();
  //     const spy = jest.spyOn(xml2js, 'parseString');
  //     const xml = '<ok></ok>';
  //     Utils.parseXmlBody(xml);
  //     expect(spy).toHaveBeenCalled();

  //   });
  // });
});
