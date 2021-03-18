import { TestBed } from '@angular/core/testing';

import { TrackingVehiculeService } from './tracking-vehicule.service';

describe('TrackingVehiculeService', () => {
  let service: TrackingVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
