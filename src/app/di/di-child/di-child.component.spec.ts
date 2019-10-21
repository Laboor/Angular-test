import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiChildComponent } from './di-child.component';

describe('DiChildComponent', () => {
  let component: DiChildComponent;
  let fixture: ComponentFixture<DiChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
