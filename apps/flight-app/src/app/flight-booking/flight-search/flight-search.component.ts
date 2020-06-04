import {Component, OnInit} from '@angular/core';
import {FlightService} from '@flight-workspace/flight-api';
import { FlightBookingAppState, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { flightsLoaded, loadFlights } from '../+state/flight-booking.actions';
import { getFlights, getFlights2 } from '../+state/flight-booking.selectors';


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
    return [];
  }

  // "shopping basket" with selected flights
  basket: object = {
    "3": true,
    "5": true
  };

  flights$ = this.store.select(getFlights2);


  constructor(
    private store: Store<FlightBookingAppState>) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({
      from: this.from,
      to: this.to,
      urgent: this.urgent
    }));


  }

  delay(): void {
    // this.flightService.delay();
  }

}
