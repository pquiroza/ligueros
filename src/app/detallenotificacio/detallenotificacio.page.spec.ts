import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallenotificacioPage } from './detallenotificacio.page';

describe('DetallenotificacioPage', () => {
  let component: DetallenotificacioPage;
  let fixture: ComponentFixture<DetallenotificacioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallenotificacioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallenotificacioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
