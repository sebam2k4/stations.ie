import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IrishRailService } from './irish-rail.service';
import { IrishRailStation, IrishRailStationJourney } from './irish-rail.model';
import {
  mockIrishRailStationsObject,
  mockIrishRailStationsList,
  mockIrishRailStationJourneysObject,
  mockIrishRailStationJourneysList
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

  beforeEach( waitForAsync(() => {
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(IrishRailService);
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
    it('should return converted Observable<IrishRailStation[]> list of irish-rail stations', waitForAsync(() => {
      const mockResponseBody = mockIrishRailStationsObject;

      service.getAllStations().subscribe((stations: IrishRailStation[]) => {
        expect(Array.isArray(stations)).toBe(true);
        expect(stations).toEqual(mockIrishRailStationsList);
        stations.forEach(station => {
          expect(station instanceof IrishRailStation).toBe(true);
        });
      });

      const mockRequest = httpMock.expectOne({
        url: 'http://localhost:9000/.netlify/functions/stations-express/stations',
      });

      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockResponseBody);
    }));
  });

  describe('#getAllJourneys', () => {
    it('should return converted Observable<IrishRailStationJourney[]> list of station\'s journeys', waitForAsync(() => {
        const mockResponseBody = mockIrishRailStationJourneysObject;
      const stationCode = 'CLBAR';

      service.getAllJourneys(stationCode).subscribe((journeys: IrishRailStationJourney[]) => {
        expect(Array.isArray(journeys)).toBe(true);
        expect(journeys).toEqual(mockIrishRailStationJourneysList);
        journeys.forEach(journey => {
          expect(journey instanceof IrishRailStationJourney).toBe(true);
        });
      });

      const mockRequest = httpMock.expectOne({
        url: `http://localhost:9000/.netlify/functions/stations-express/stations/${stationCode}`,
      });

      expect(mockRequest.request.method).toBe('GET');

      mockRequest.flush(mockResponseBody);
    }));
  });
});
