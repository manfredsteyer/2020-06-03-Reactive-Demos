import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { FlightSearchComponent } from './flight-search.component';
import { FlightBookingModule } from '../flight-booking.module';
import {RouterTestingModule} from "@angular/router/testing";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FlightBookingAppState, initialState } from '../+state/flight-booking.reducer';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { loadFlights } from '../+state/flight-booking.actions';


describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  let mockStore: MockStore;

  const intialState: FlightBookingAppState = {
    flightBooking: {
      exclusionList: [],
      stats: {},
      flights: [
        { id: 1, from: 'A', to: 'B', date: '2020-12-24', delayed: false},
        { id: 2, from: 'A', to: 'B', date: '2020-12-24', delayed: false}
      ]
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        FlightSearchComponent,
        FlightCardComponent
      ],
      providers: [
        //{ provide: FlightService, useClass: FlightServiceMock },
        provideMockStore({ initialState: intialState })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should display flights from store', () => { 
      const trs = fixture
        .debugElement
        .queryAll(By.css('flight-card'));

      expect(trs.length).toBe(2);
  });


  it('should display flights from store (component)', () => {
    component.flights$.subscribe(flights => {
      expect(flights.length).toBe(2);
    });
  });


  it('should use loadFlights action', () => {
    component.search();
    mockStore.scannedActions$.subscribe(a => {
      expect(a.type).toBe(loadFlights.type);
    })
  });




});
