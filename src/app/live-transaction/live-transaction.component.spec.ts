import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTransactionComponent } from './live-transaction.component';

describe('LiveTransactionComponent', () => {
  let component: LiveTransactionComponent;
  let fixture: ComponentFixture<LiveTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
