import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  NgForm,
  FormControlName,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { MASKS } from 'ng-brazil';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CalculadoraFormulario } from 'src/app/model/calculadora-formulario';
import { CalculadorasService } from 'src/app/providers/calculadoras.service';
import { MenuService } from 'src/app/providers/menu.service';
import { FGService } from 'src/app/utils/FG.service';

@Component({
  selector: 'app-calculadora-grid-interna',
  templateUrl: './calculadora-grid-interna.component.html',
})
export class CalculadoraGridInternaComponent implements OnInit {
  @ViewChild('formulario') form!: NgForm;
  @ViewChild('btn', { static: false }) btn!: ElementRef;
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];
  @ViewChild('dataGridVar', { static: false }) dataGrid!: DxDataGridComponent;
  @ViewChild('staticModal', { static: false }) modal!: ModalDirective;
  @ViewChild('staticModalExcluir', { static: false })
  modalExcluir!: ModalDirective;
  @Input() key: any;

  public MASKS = MASKS;
  formG!: FormGroup;
  formulario: CalculadoraFormulario;
  dataSource: any;
  codigoExcluir: any;
  nomeexcluir: any;
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
    this.abrirModalExcluir = this.abrirModalExcluir.bind(this);
    this.popularMenu();
  }

  ngOnInit() {
    this.formG = this.fb.group({
      Codigo: [''],
      Titulo: ['', [Validators.required]],
      Funcao: ['', [Validators.required]],
      Codigo_Menu: ['', [Validators.required]],
    });
    this.obterDados();
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
    this._service.getByMenu(this.key).subscribe((x) => {
      this.dataSource = x;
      this.fg.DesativarSpinner();
    });
  }
  popularMenu() {
    this._menuService.getAll().subscribe((x) => {
      this.dataSourceMenu = x;
    });
  }
  abriModalIncluir(e?: any) {
    var dados = e.row.data;
    this.formG.patchValue(dados);
    this.modal.show();
  }
  abrirModalExcluir(e: any) {
    this.codigoExcluir = e.row.data.Codigo;
    this.nomeexcluir = e.row.data.Titulo;
    this.modalExcluir.show();
  }
  EnviarExcluir(f: any) {
    this.fg.AtivarSpinner();
    this._service.delete(this.codigoExcluir).then((x) => {
      this.modalExcluir.hide();
      this.fg.DesativarSpinner();
    });
  }
  enviarFormulario() {
    if (this.formG.valid) {
      this.fg.AtivarSpinner();
      this._service.update(this.formG.value).then((x) => {
        this.modal.hide();
        this.fg.DesativarSpinner();
      });
    }
  }

  //#endregion
}
