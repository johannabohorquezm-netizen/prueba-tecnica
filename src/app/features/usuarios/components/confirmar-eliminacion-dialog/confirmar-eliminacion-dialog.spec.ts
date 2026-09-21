import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarEliminacionDialog } from './confirmar-eliminacion-dialog';

describe('ConfirmarEliminacionDialog', () => {
  let component: ConfirmarEliminacionDialog;
  let fixture: ComponentFixture<ConfirmarEliminacionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarEliminacionDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarEliminacionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
