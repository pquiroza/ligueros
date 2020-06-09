import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallenoticiaPage } from './detallenoticia.page';

describe('DetallenoticiaPage', () => {
  let component: DetallenoticiaPage;
  let fixture: ComponentFixture<DetallenoticiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallenoticiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallenoticiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
