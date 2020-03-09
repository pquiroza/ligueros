import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallecampeonatoPage } from './detallecampeonato.page';

describe('DetallecampeonatoPage', () => {
  let component: DetallecampeonatoPage;
  let fixture: ComponentFixture<DetallecampeonatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallecampeonatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallecampeonatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
