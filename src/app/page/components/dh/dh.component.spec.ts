import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhComponent } from './dh.component';

describe('DhComponent', () => {
  let component: DhComponent;
  let fixture: ComponentFixture<DhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
