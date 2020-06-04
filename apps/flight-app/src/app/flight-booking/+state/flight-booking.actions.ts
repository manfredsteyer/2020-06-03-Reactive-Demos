import { createAction, props } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';

export const flightsLoaded = createAction(
  '[FlightBooking] flightsLoaded',
  props<{ flights: Flight[] }>()
);

export const flightUpdated = createAction(
  '[FlightBooking] flightUpdated',
  props<{ flight: Flight }>()
);



