import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderDashboardComponent } from './under-dashboard.component';

describe('UnderDashboardComponent', () => {
  let component: UnderDashboardComponent;
  let fixture: ComponentFixture<UnderDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
