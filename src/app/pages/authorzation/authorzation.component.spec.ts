import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorzationComponent } from './authorzation.component';

describe('AuthorzationComponent', () => {
  let component: AuthorzationComponent;
  let fixture: ComponentFixture<AuthorzationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorzationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorzationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
