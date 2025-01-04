import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.page.html',
  styleUrls: ['./principal-page.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule], // Importa dependencias necesaria
})
export class PrincipalPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
