import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IrishRailService } from './irish-rail.service';

describe('IrishRailService', () => {
  let irishRailService: IrishRailService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IrishRailService
      ]
    });
  });

  describe('#constructor', () => {
    it('should be created', () => {
      const service: IrishRailService = TestBed.get(IrishRailService);
      expect(service).toBeTruthy();
    });
  });
 
});
