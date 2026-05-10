import { TestBed } from '@angular/core/testing';

import { DataCentreService } from './data-centre.service';

describe('DataCentreService', () => {
  let service: DataCentreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCentreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
