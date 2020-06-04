import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-api';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded } from '../+state/flight-booking.actions';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  // Aufrufer: const f = x.flights;
  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$ = this.store.select(a => a[flightBookingFeatureKey].flights);

  constructor(
    private store: Store<FlightBookingAppState>,
    private flightService: FlightService) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .find(this.from, this.to, this.urgent)
      .subscribe({
        next: (flights) => {

          this.store.dispatch(flightsLoaded({flights}));

        },
        error: (err) => {
          console.error('err', err);
        }
      })
  }

  delay(): void {
    this.flightService.delay();
  }

}
