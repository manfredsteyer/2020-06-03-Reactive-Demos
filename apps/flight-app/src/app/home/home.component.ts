import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subject, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Flight } from '@flight-workspace/flight-api';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  expertMode = false;
  needsLogin = false;
  _userName = '';

  get userName(): string {
    return this._userName;
  }

  constructor(private route: ActivatedRoute) {



    const addFlight$ = new Subject<Flight>();
    
    const flights$: Observable<Flight[]> = addFlight$.pipe(
      scan( (last, next) => {
        return [...last, next];
      }, [])
    );

    flights$.subscribe(flights => console.debug('flights', flights));

    addFlight$.next({ id: 1, from: 'A', to: 'B', date: 'now', delayed: false});
    addFlight$.next({ id: 2, from: 'A', to: 'B', date: 'now', delayed: false});
    addFlight$.next({ id: 3, from: 'A', to: 'B', date: 'now', delayed: false});
    addFlight$.next({ id: 4, from: 'A', to: 'B', date: 'now', delayed: false});

  }

  changed($event): void {
    console.debug('$event.detail ', $event.target.detail);

    this.expertMode = $event.detail
  }

  ngOnInit() {
    this.needsLogin = !!this.route.snapshot.params['needsLogin'];
  }

  login(): void {
    this._userName = 'Login will be implemented in another exercise!'
  }

  logout(): void {
    this._userName = '';
  }


}
