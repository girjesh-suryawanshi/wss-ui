import { TestBed } from '@angular/core/testing';

import { IncidentMasterService } from './incident-master.service';

describe('IncidentMasterService', () => {
  let service: IncidentMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
