import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallepartidoPage } from './detallepartido.page';

describe('DetallepartidoPage', () => {
  let component: DetallepartidoPage;
  let fixture: ComponentFixture<DetallepartidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallepartidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallepartidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
