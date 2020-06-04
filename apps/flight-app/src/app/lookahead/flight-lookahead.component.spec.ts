import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { FlightLookaheadComponent } from './flight-lookahead.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { Flight, FlightService } from '@flight-workspace/flight-api';

class FlightServiceMock {
  
  constructor() {
  }

  find(from: string): Observable<Flight[]> {
    return of([
      { id: 1, from: 'A', to: 'B', date: '2020-12-24', delayed: false},
      { id: 2, from: 'A', to: 'B', date: '2020-12-24', delayed: false}
    ]);
  }
}


describe('TestComponent', () => {
  let component: FlightLookaheadComponent;
  let fixture: ComponentFixture<FlightLookaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [ FlightLookaheadComponent ],
      providers: [
        { provide: FlightService, useClass: FlightServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightLookaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should search for flights (async)', (done) => { 
    
    const from = fixture
      .debugElement
      .query(By.css('input[name=from]'))
      .nativeElement;

    from.value = 'Graz';
    from.dispatchEvent(new Event('input'));

    component.flights$.subscribe(_ => {
      fixture.detectChanges();
      const trs = fixture
        .debugElement
        .queryAll(By.css('tr'));

      expect(trs.length).toBe(2);
      done();
    });

  });

  it('should search for flights (fake async)', fakeAsync(() => {
    
    const from = fixture
      .debugElement
      .query(By.css('input[name=from]'))
      .nativeElement;

    from.value = 'Graz';
    from.dispatchEvent(new Event('input'));
    tick(300);    
    fixture.detectChanges();

    const trs = fixture
      .debugElement
      .queryAll(By.css('tr'));

    expect(trs.length).toBe(2);

  }));

  it('should search for flights (component)', (done) => {
    
    component.control.setValue('Graz');

    component.flights$.subscribe(flights => {
      expect(flights.length).toBe(2);
      done();
    });

  });

});
