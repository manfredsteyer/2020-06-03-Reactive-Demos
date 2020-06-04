import { Action, createReducer, on } from '@ngrx/store';
import { Flight } from '@flight-workspace/flight-api';
import { flightsLoaded, flightUpdated } from './flight-booking.actions';

export const flightBookingFeatureKey = 'flightBooking';

export interface FlightBookingAppState {
  [flightBookingFeatureKey]: FlightBookingState;
}

export interface FlightBookingState {
  flights: Flight[];
  stats: object;
}

export const initialState: FlightBookingState = {
  flights: [],
  stats: {}
};

const flightBookingReducer = createReducer(
  initialState,

  on(flightsLoaded, (state, action) => {
    const flights = action.flights;

    // Mutating --> forbidden!
    // state.flights = flights;

    return { ...state, flights }
  }),

  on(flightUpdated, (state, action) => {

    const flight = action.flight;

    // state.flights --- [flight, flight, flight, flight]
    //                              ^
    //                               \--- flight

    const flights = state.flights.map(f => f.id === flight.id? flight : f);

    // Mutating --> forbidden!
    // state.flights = flights;

    return { ...state, flights }

  }),

);

export function reducer(state: FlightBookingState | undefined, action: Action) {
  return flightBookingReducer(state, action);
}
