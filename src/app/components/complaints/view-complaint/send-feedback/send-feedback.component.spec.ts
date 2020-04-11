import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFeedbackComponent } from './send-feedback.component';

describe('SendFeedbackComponent', () => {
  let component: SendFeedbackComponent;
  let fixture: ComponentFixture<SendFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
