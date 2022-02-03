import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipTypeComponent } from './chip-type.component';

describe('ChipTypeComponent', () => {
  let component: ChipTypeComponent;
  let fixture: ComponentFixture<ChipTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
