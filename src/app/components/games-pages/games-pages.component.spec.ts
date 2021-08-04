import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesPagesComponent } from './games-pages.component';

describe('GamesPagesComponent', () => {
  let component: GamesPagesComponent;
  let fixture: ComponentFixture<GamesPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
