import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TubesBytagComponent } from './tubes-bytag.component';

describe('TubesBytagComponent', () => {
  let component: TubesBytagComponent;
  let fixture: ComponentFixture<TubesBytagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TubesBytagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TubesBytagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
