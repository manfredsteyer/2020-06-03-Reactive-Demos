
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, interval, combineLatest, BehaviorSubject, of } from 'rxjs';
import { startWith, map, distinctUntilChanged, shareReplay, debounceTime, filter, tap, switchMap, takeUntil, catchError } from 'rxjs/operators';
import { Flight, FlightService } from '@flight-workspace/flight-api';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FlightLookaheadService implements OnDestroy {
    
    private from$$ = new Subject<string>();
    private loading$$ = new BehaviorSubject<boolean>(false);
    private close$$ = new Subject<void>();
    private error$$ = new Subject<string>();

    public online$: Observable<boolean>;
    public flights$: Observable<Flight[]>;
    public loading$ = this.loading$$.asObservable();
    public error$ = this.error$$.asObservable();

    constructor(private flightService: FlightService) { 

        this.online$ 
            = interval(2000).pipe(
                startWith(0),
                map(_ => Math.random() < 0.5),
                map(_ => true),
                distinctUntilChanged(), // f, f, f, t, t, t --> f, t
                shareReplay(1),                
            );

        const input$ = this.from$$.pipe(
            debounceTime(300)
        );

        this.flights$ = combineLatest([input$, this.online$]).pipe(
            filter( ([_, online]) => online),
            map(([input, _]) => input),
            tap(_ => this.loading$$.next(true)),
            switchMap( input => this.load(input)),
            tap(_ => this.loading$$.next(false)),
            shareReplay(1),
            takeUntil(this.close$$)
        );
    }

    ngOnDestroy(): void {
        this.close$$.next();
    }
    
    search(from: string): void {
        this.from$$.next(from);
    }

    load(from: string): Observable<Flight[]>  {
        
        return this.flightService.find(from, '').pipe(
            catchError(err => {
                this.error$$.next(err);
                return of([]);
            })
        );

    };

}