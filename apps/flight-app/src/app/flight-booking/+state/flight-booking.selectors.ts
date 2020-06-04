import { createFeatureSelector, createSelector } from '@ngrx/store';
import { flightBookingFeatureKey, FlightBookingState, FlightBookingAppState } from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<FlightBookingState>(
  flightBookingFeatureKey
);


export const getFlights3 = createSelector(
  selectFlightBookingState,
  flightBooking => flightBooking.flights
);

export const getFlights = 
  (a: FlightBookingAppState) => a[flightBookingFeatureKey].flights;


export const getFlights2 = createSelector(
  (a: FlightBookingAppState) => a[flightBookingFeatureKey].flights,
  (a: FlightBookingAppState) => a[flightBookingFeatureKey].exclusionList,
  (flights, exclusionList) => flights.filter(f => !exclusionList.includes(f.id))
);