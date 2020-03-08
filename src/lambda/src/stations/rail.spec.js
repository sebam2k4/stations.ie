const Rail = require('./rail');
const utils = require('../utility/utils');
// const fetch = require('node-fetch').default;
// const ErrorHandler = require('../utility/errorHandlers');

const settings = require('./rail-settings');

describe('rail.js', () => {

  it('no tests', () => {

  });
  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  // describe('#_processRailStationsBody', () => {
  //   beforeEach(() => {

  //   });

  //   it('should work as expected', () => {
  //     const mockRailStations = {
  //       ArrayOfObjStation: {
  //         objStation: [
  //           {
  //             StationDesc: 'Shankill',
  //             StationAlias: '',
  //             Stationlatitude: '53.2364',
  //             StationLongitude: '-6.11691',
  //             StationCode: 'SKILL',
  //             StationId: '136'
  //           },
  //           {
  //             StationDesc: 'Belfast',
  //             StationAlias: '',
  //             Stationlatitude: '54.6123',
  //             StationLongitude: '-5.91744',
  //             StationCode: 'BFSTC',
  //             StationId: '228'
  //           },
  //           {
  //             StationDesc: 'Craughwell',
  //             StationAlias: '',
  //             Stationlatitude: '53.2252',
  //             StationLongitude: '-8.7359',
  //             StationCode: 'CRGHW',
  //             StationId: '184'
  //           }
  //         ]
  //       }
  //     };

  //     const expected = [
  //       {
  //         stationCode: 'BFSTC',
  //         stationFullName: 'Belfast'
  //       },
  //       {
  //         stationCode: 'CRGHW',
  //         stationFullName: 'Craughwell'
  //       },
  //       {
  //         stationCode: 'SKILL',
  //         stationFullName: 'Shankill'
  //       }
  //     ];

  //     const result = Rail._processRailStationsBody(mockRailStations);

  //     expect(result).toEqual(expected);
  //   });

  //   it('should work as expected', () => {
  //     const spyFormatRailProperties = jest.spyOn(Rail, '_formatRailProperties').mockReturnValue(
  //       [
  //         { stationCode: 'CRGHW',
  //           stationFullName: 'Craughwell'
  //         },
  //         {
  //           stationCode: 'BFSTC',
  //           stationFullName: 'Belfast'
  //         },
  //         {
  //           stationCode: 'SKILL',
  //           stationFullName: 'Shankill'
  //         }
  //       ]
  //     );
  //     const spySortObjectsByKey = jest.spyOn(utils, 'sortObjectsByKey');
  //     const mockRailStations = {
  //       ArrayOfObjStation: {
  //         objStation: [
  //           {
  //             StationDesc: 'Shankill',
  //             StationAlias: '',
  //             Stationlatitude: '53.2364',
  //             StationLongitude: '-6.11691',
  //             StationCode: 'SKILL',
  //             StationId: '136'
  //           },
  //           {
  //             StationDesc: 'Belfast',
  //             StationAlias: '',
  //             Stationlatitude: '54.6123',
  //             StationLongitude: '-5.91744',
  //             StationCode: 'BFSTC',
  //             StationId: '228'
  //           },
  //           {
  //             StationDesc: 'Craughwell',
  //             StationAlias: '',
  //             Stationlatitude: '53.2252',
  //             StationLongitude: '-8.7359',
  //             StationCode: 'CRGHW',
  //             StationId: '184'
  //           }
  //         ]
  //       }
  //     };
  //     const mockStationsList = mockRailStations.ArrayOfObjStation.objStation;

  //     const expected = [
  //       {
  //         stationCode: 'BFSTC',
  //         stationFullName: 'Belfast'
  //       },
  //       {
  //         stationCode: 'CRGHW',
  //         stationFullName: 'Craughwell'
  //       },
  //       {
  //         stationCode: 'SKILL',
  //         stationFullName: 'Shankill'
  //       }
  //     ];

  //     const result = Rail._processRailStationsBody(mockRailStations);

  //     expect(spyFormatRailProperties).toHaveBeenCalledWith(mockStationsList, settings.railStationProperties, settings.railStationKeysMap);

  //     const mockFilteredStationsList = spyFormatRailProperties(mockStationsList, settings.railStationProperties, settings.railStationKeysMap);

  //     expect(spySortObjectsByKey).toHaveBeenCalledWith(mockFilteredStationsList, expect.any(String));

  //     expect(result).toEqual(expected);
  //   });

  //   it('should return an empty array when ArrayOfObjStation prop undefined', () => {
  //     const mockRailStations = {};

  //     const expected = [];

  //     const result = Rail._processRailStationsBody(mockRailStations);

  //     expect(result).toEqual(expected);
  //   });

  //   it('should return an empty array when objStation prop undefined', () => {
  //     const mockRailStations = {
  //       ArrayOfObjStation: {}
  //     };

  //     const expected = [];

  //     const result = Rail._processRailStationsBody(mockRailStations);

  //     expect(result).toEqual(expected);
  //   });
  // });

  // describe('#_processRailJourneysBody', () => {

  // });

  // describe('#_filterRailProperties', () => {
  //   it('should return filtered list and renamed list for Rail Stations', () => {
  //     const spyGetPropsToFilter = jest.spyOn(utils, 'getPropsToFilter');

  //     const mockDataList = [
  //       {
  //         StationDesc: 'Shankill',
  //         StationAlias: '',
  //         Stationlatitude: '53.2364',
  //         StationLongitude: '-6.11691',
  //         StationCode: 'SKILL',
  //         StationId: '136'
  //       },
  //       {
  //         StationDesc: 'Belfast',
  //         StationAlias: '',
  //         Stationlatitude: '54.6123',
  //         StationLongitude: '-5.91744',
  //         StationCode: 'BFSTC',
  //         StationId: '228'
  //       },
  //       {
  //         StationDesc: 'Craughwell',
  //         StationAlias: '',
  //         Stationlatitude: '53.2252',
  //         StationLongitude: '-8.7359',
  //         StationCode: 'CRGHW',
  //         StationId: '184'
  //       }
  //     ];

  //     const expected = [
  //       {
  //         stationCode: 'SKILL',
  //         stationFullName: 'Shankill'
  //       },
  //       {
  //         stationCode: 'BFSTC',
  //         stationFullName: 'Belfast'
  //       },
  //       { stationCode: 'CRGHW',
  //         stationFullName: 'Craughwell'
  //       }
  //     ];

  //     const result = Rail._filterRailProperties(mockDataList, settings.railStationProperties, settings.railStationKeysMap);

  //     expect(spyGetPropsToFilter).toHaveBeenCalledWith(settings.railStationProperties);

  //     expect(result).toEqual(expected);
  //   });
  // });
});
