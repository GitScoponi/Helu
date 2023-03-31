import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Menus = [
    { Titulo: 'Menu', Rota: '/menu', Icone: 'fa fa-bars', Descricao: 'Manutenção Menu' },
    { Titulo: 'Calculadora', Rota: '/calculadora', Icone: 'fa fa-calculator', Descricao: 'Manutenção Calculadora' },
    { Titulo: 'Parametros', Rota: '/parametros', Icone: 'fa fa-cogs', Descricao: 'Manutenção Parametros' },
  ];

  constructor() {}

  ngOnInit(): void {
    document
      .querySelector('.day-night input')
      ?.addEventListener('change', () => {
        document.querySelector('body')?.classList.add('toggle');
        setTimeout(() => {
          document.querySelector('body')?.classList.toggle('light');
          setTimeout(
            () => document.querySelector('body')?.classList.remove('toggle'),
            10
          );
        }, 5);
      });
  }
}
