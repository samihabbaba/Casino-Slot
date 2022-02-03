import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTransactionComponent } from './case-transaction.component';

describe('CaseTransactionComponent', () => {
  let component: CaseTransactionComponent;
  let fixture: ComponentFixture<CaseTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
