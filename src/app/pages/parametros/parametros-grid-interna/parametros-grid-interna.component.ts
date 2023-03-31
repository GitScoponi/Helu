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
import { ParametrosFormulario } from 'src/app/model/parametros-formulario';
import { CalculadorasService } from 'src/app/providers/calculadoras.service';
import { ParametrossService } from 'src/app/providers/parametros.service';
import { FGService } from 'src/app/utils/FG.service';

@Component({
  selector: 'app-parametros-grid-interna',
  templateUrl: './parametros-grid-interna.component.html',
})
export class ParametrosGridInternaComponent implements OnInit {
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
  formulario: ParametrosFormulario;
  dataSource: any;
  codigoExcluir: any;
  nomeexcluir: any;
  dataSourceTipo = [
    { codigo: 1, tipo: 'inteiro' },
    { codigo: 2, tipo: 'decimal' },
    { codigo: 3, tipo: 'texto' },
  ];
  dataSourceCalculadora: any = [];
  constructor(
    private fb: FormBuilder,
    private fg: FGService,
    private elem: ElementRef,
    private _service: ParametrossService,
    private _calculadoraService: CalculadorasService,
    private router: Router
  ) {
    this.formulario = new ParametrosFormulario();
    this.abriModalIncluir = this.abriModalIncluir.bind(this);
    this.abrirModalExcluir = this.abrirModalExcluir.bind(this);
    this.popularCalculadora();
  }

  ngOnInit() {
    this.formG = this.fb.group({
      Codigo: [''],
      Titulo: ['', [Validators.required]],
      Posicao: ['', [Validators.required]],
      Tipo: ['', [Validators.required]],
      Unidade: ['', [Validators.required]],
      Codigo_Calculadora: ['', [Validators.required]],
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
  obterDados() {
    this.fg.AtivarSpinner();
    this._service.getByCalculadora(this.key).subscribe((x) => {
      this.dataSource = x;
      this.fg.DesativarSpinner();
      console.log(x);
    });
  }
  popularCalculadora() {
    this._calculadoraService.getAll().subscribe((x) => {
      this.dataSourceCalculadora = x;
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
