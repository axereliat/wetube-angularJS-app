import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TubeEditComponent } from './tube-edit.component';

describe('TubeEditComponent', () => {
  let component: TubeEditComponent;
  let fixture: ComponentFixture<TubeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TubeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TubeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
