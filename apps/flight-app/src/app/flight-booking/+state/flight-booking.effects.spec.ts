import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { FlightBookingEffects } from './flight-booking.effects';
import { loadFlights, flightsLoaded } from './flight-booking.actions';
import { FlightService, Flight } from '@flight-workspace/flight-api';

class FlightServiceMock {
  
  constructor() {
  }

  find(from: string): Observable<Flight[]> {
    return of([
      { id: 1, from: 'A', to: 'B', date: '2020-12-24', delayed: false},
      { id: 2, from: 'A', to: 'B', date: '2020-12-24', delayed: false}
    ]);
  }
}

describe('FlightBookingEffects', () => {
  let actions$: Observable<any>;
  let effects: FlightBookingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlightBookingEffects,
        { provide: FlightService, useClass: FlightServiceMock },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject<FlightBookingEffects>(FlightBookingEffects);
  });

  it('should load flights', () => {
    actions$ = of(loadFlights({ from: 'A', to: 'B', urgent: false}))

    effects.loadFlights$.subscribe(action => {
      expect(action.type).toBe(flightsLoaded.type);
      expect(action.flights.length).toBe(2);
    });

  });
});
