import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IrishRailService } from './irish-rail.service';
import { IrishRailStation, IrishRailStationJourney } from './irish-rail.model';
import {
  mockIrishRailStationObject,
  mockIrishRailStationConvertedList,
  mockIrishRailStationJourneyObject,
  mockIrishRailStationJourneyConvertedList
} from '../../../mock/data/irish-rail.mock';

describe('IrishRailService', () => {
  let service: IrishRailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IrishRailService]
    });
  });

  beforeEach(async(() => {
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(IrishRailService);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('#constructor', () => {
    it('service should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#getAllStations', () => {
    it('should return converted Observable<IrishRailStation[]> list of irish-rail stations', async(() => {
      const mockResponseBody = mockIrishRailStationObject;

      service.getAllStations().subscribe((stations: IrishRailStation[]) => {
        expect(Array.isArray(stations)).toBe(true);
        expect(stations).toEqual(mockIrishRailStationConvertedList);
        stations.forEach(station => {
          expect(station instanceof IrishRailStation).toBe(true);
        });
      });

      const mockRequest = httpMock.expectOne({
        url: 'http://127.0.0.1:5000/api/stations',
      });

      expect(mockRequest.request.method).toBe("GET");

      mockRequest.flush(mockResponseBody);
    }))
  });

  describe('#getAllJourneys', () => {
    it('should return converted Observable<IrishRailStationJourney[]> list of station\'s journeys', async(() => {
      const mockResponseBody = mockIrishRailStationJourneyObject;
      const stationCode = 'CLBAR';

      service.getAllJourneys(stationCode).subscribe((journeys: IrishRailStationJourney[]) => {
        expect(Array.isArray(journeys)).toBe(true);
        expect(journeys).toEqual(mockIrishRailStationJourneyConvertedList);
        journeys.forEach(journey => {
          expect(journey instanceof IrishRailStationJourney).toBe(true);
        });
      });

      const mockRequest = httpMock.expectOne({
        url: `http://127.0.0.1:5000/api/station-data/${stationCode}`,
      });

      expect(mockRequest.request.method).toBe("GET");

      mockRequest.flush(mockResponseBody);
    }))
  });
});
