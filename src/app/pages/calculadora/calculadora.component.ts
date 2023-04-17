import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { MASKS } from 'ng-brazil';
import { FGService } from '../../utils/FG.service';
import {
  NgForm,
  FormControlName,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CalculadorasService } from '../../providers/calculadoras.service';
import { CalculadoraFormulario } from '../../model/calculadora-formulario';
import { MenuService } from 'src/app/providers/menu.service';
@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
})
export class CalculadoraComponent implements OnInit {
  @ViewChild('formulario') form!: NgForm;
  @ViewChild('btn', { static: false }) btn!: ElementRef;
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];
  @ViewChild('dataGridVar', { static: false }) dataGrid!: DxDataGridComponent;
  @ViewChild('staticModal', { static: false }) modal!: ModalDirective;

  public MASKS = MASKS;
  formG!: FormGroup;
  formulario: CalculadoraFormulario;
  dataSource: any;
  dataSourceMenu: any = [];
  constructor(
    private fb: FormBuilder,
    private fg: FGService,
    private elem: ElementRef,
    private _service: CalculadorasService,
    private _menuService: MenuService,
    private router: Router
  ) {
    this.formulario = new CalculadoraFormulario();
    this.abriModalIncluir = this.abriModalIncluir.bind(this);
    this.obterDados();
    this.popularMenu();
  }

  ngOnInit() {
    this.formG = this.fb.group({
      Codigo: [''],
      Titulo: ['', [Validators.required]],
      Funcao: ['', [Validators.required]],
      Codigo_Menu: ['', [Validators.required]],
      Observacao: [''],
    });
  }

  ngAfterViewInit(): void {
    this.formulario.ativarFormulario(
      this.formInputElements,
      this.formG,
      this.btn
    );
  }

  //#region GRID
  obterDados(request?: any) {
    this.fg.AtivarSpinner();
    this._menuService.getAll().subscribe((x) => {
      this.dataSource = x;
      console.log(x);
      this.fg.DesativarSpinner();
    });
  }
  popularMenu() {
    this._menuService.getAll().subscribe((x) => {
      this.dataSourceMenu = x;
    });
  }
  abriModalIncluir(e?: any) {
    this.formG.reset();
    this.modal.show();
  }

  enviarFormulario() {
    if (this.formG.valid) {
      this.fg.AtivarSpinner();
      this._service.insert(this.formG.value).then((x) => {
        this.modal.hide();
        this.fg.DesativarSpinner();
      });
    }
  }

  //#endregion
}
