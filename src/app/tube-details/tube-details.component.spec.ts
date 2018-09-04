import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TubeDetailsComponent } from './tube-details.component';

describe('TubeDetailsComponent', () => {
  let component: TubeDetailsComponent;
  let fixture: ComponentFixture<TubeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TubeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TubeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
