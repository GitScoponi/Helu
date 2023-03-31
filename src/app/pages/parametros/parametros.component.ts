import {
  Component,
  ElementRef,
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
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
})
export class ParametrosComponent implements OnInit {
  @ViewChild('formulario') form!: NgForm;
  @ViewChild('btn', { static: false }) btn!: ElementRef;
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];
  @ViewChild('dataGridVar', { static: false }) dataGrid!: DxDataGridComponent;
  @ViewChild('staticModal', { static: false }) modal!: ModalDirective;

  public MASKS = MASKS;
  formG!: FormGroup;
  formulario: ParametrosFormulario;
  dataSource: any;
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
    this.obterDados();
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
    this._service.getAll().subscribe((x) => {
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
