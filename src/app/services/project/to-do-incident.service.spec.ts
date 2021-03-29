import { TestBed } from '@angular/core/testing';

import { ToDoIncidentService } from './to-do-incident.service';

describe('ToDoIncidentService', () => {
  let service: ToDoIncidentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoIncidentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
