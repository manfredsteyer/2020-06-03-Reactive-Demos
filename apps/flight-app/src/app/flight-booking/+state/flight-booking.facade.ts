
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { FlightBookingAppState, flightBookingFeatureKey } from './flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights } from './flight-booking.actions';
import { getFlights2 } from './flight-booking.selectors';

@Injectable({providedIn: 'root'})
export class FlightBookingFacade {

    // -- 4 --
    public flights$: Observable<Flight[]> = this.store.select(getFlights2);

    constructor(
        private store: Store<FlightBookingAppState>) { }

    search(from: string, to: string, urgent: boolean): void {
        this.store.dispatch(loadFlights({from, to, urgent}));
    }

    // // -- 3 --
    // public flights$: Observable<Flight[]> = this.store.select(getFlights2);

    // constructor(
    //     private store: Store<FlightBookingAppState>,
    //     private flightService: FlightService) { }

    // search(from: string, to: string, urgent: boolean): void {
    //     this.flightService.find(from, to, urgent).subscribe({
    //         next: (flights) => {

    //             this.store.dispatch(flightsLoaded({flights}))

    //         },
    //         error: err => {
    //             console.error('err', err);
    //         }
    //     });
    // }


    // // -- 2 --
    // public flights$: Observable<Flight[]> = this.store.select(a => a[flightBookingFeatureKey].flights);

    // constructor(
    //     private store: Store<FlightBookingAppState>,
    //     private flightService: FlightService) { }

    // search(from: string, to: string, urgent: boolean): void {
    //     this.flightService.find(from, to, urgent).subscribe({
    //         next: (flights) => {

    //             this.store.dispatch(flightsLoaded({flights}))

    //         },
    //         error: err => {
    //             console.error('err', err);
    //         }
    //     });
    // }
    

    // // -- 1 --
    // private flights$$ = new BehaviorSubject<Flight[]>([]);
    // public flights$: Observable<Flight[]> = this.flights$$.asObservable();

    // constructor(private flightService: FlightService) { }

    // search(from: string, to: string, urgent: boolean): void {
    //     this.flightService.find(from, to, urgent).subscribe({
    //         next: (flights) => {
    //             this.flights$$.next(flights);
    //         },
    //         error: err => {
    //             console.error('err', err);
    //         }
    //     })
    // }
    
}