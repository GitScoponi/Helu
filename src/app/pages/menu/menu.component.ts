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
import { MenuFormulario } from 'src/app/model/menu-formulario';
import { MenuService } from 'src/app/providers/menu.service';
import { FGService } from 'src/app/utils/FG.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  @ViewChild('formulario') form!: NgForm;
  @ViewChild('btn', { static: false }) btn!: ElementRef;
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];
  @ViewChild('dataGridVar', { static: false }) dataGrid!: DxDataGridComponent;
  @ViewChild('staticModal', { static: false }) modal!: ModalDirective;
  @ViewChild('staticModalExcluir', { static: false })
  modalExcluir!: ModalDirective;

  public MASKS = MASKS;
  formG!: FormGroup;
  formulario: MenuFormulario;
  modo!: string;
  dataSource: any;
  codigoExcluir: any;
  nomeexcluir: any;
  constructor(
    private fb: FormBuilder,
    private fg: FGService,
    private elem: ElementRef,
    private _service: MenuService,
    private router: Router
  ) {
    this.formulario = new MenuFormulario();
    this.abriModalIncluir = this.abriModalIncluir.bind(this);
    this.abrirModalExcluir = this.abrirModalExcluir.bind(this);
    this.obterDados();
  }

  ngOnInit() {
    this.formG = this.fb.group({
      Codigo: [''],
      Titulo: ['', [Validators.required]],
      Rota: ['', [Validators.required]],
      Ordenacao: ['', [Validators.required]]
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
  abriModalIncluir(e?: any) {
    if (!e) {
      this.modo = 'Adicionar';
      this.formG.reset();
    } else {
      this.modo = 'Editar';
      var dados = e.row.data;
      this.formG.patchValue(dados);
    }
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
      if (this.modo == 'Adicionar') {
        this.fg.AtivarSpinner();
        this._service.insert(this.formG.value).then((x) => {
          this.modal.hide();
          this.fg.DesativarSpinner();
        });
      }
      if (this.modo == 'Editar') {
        this.fg.AtivarSpinner();

        this._service.update(this.formG.value).then((x) => {
          this.modal.hide();
          this.fg.DesativarSpinner();
        });
      }
    }
  }

  //#endregion
}
