import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInfComponent } from './table-inf.component';

describe('TableInfComponent', () => {
  let component: TableInfComponent;
  let fixture: ComponentFixture<TableInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableInfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
