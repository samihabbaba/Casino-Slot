import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipTransferComponent } from './chip-transfer.component';

describe('ChipTransferComponent', () => {
  let component: ChipTransferComponent;
  let fixture: ComponentFixture<ChipTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
