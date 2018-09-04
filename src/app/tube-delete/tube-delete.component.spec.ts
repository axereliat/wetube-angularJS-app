import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TubeDeleteComponent } from './tube-delete.component';

describe('TubeDeleteComponent', () => {
  let component: TubeDeleteComponent;
  let fixture: ComponentFixture<TubeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TubeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TubeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
