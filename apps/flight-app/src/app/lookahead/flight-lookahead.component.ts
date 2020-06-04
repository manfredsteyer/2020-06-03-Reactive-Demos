import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, interval, combineLatest, of, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, tap, startWith, map, distinctUntilChanged, filter, shareReplay, delay, mergeMap, concatMap, exhaustMap, catchError, retry, takeUntil } from 'rxjs/operators';
import { Flight } from '@flight-workspace/flight-api';
import { FlightLookaheadService } from './flight-lookahead.service';


@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html',
    providers: [FlightLookaheadService]
})

export class FlightLookaheadComponent implements OnInit {

    constructor(private service: FlightLookaheadService) {
    }

    control: FormControl;

    flights$ = this.service.flights$;
    loading$ = this.service.loading$;
    online$ = this.service.online$;

    ngOnInit(): void {
        this.control = new FormControl();

        this.control.valueChanges.subscribe(input => {
            this.service.search(input);
        });
    }

}
