import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';

@Component({
  selector: 'app-shoppin',
  templateUrl: './shoppin.page.html',
  styleUrls: ['./shoppin.page.scss'],
  standalone: true, // Indica que este es un componente standalone
  imports: [IonicModule, CommonModule], // Importa dependencias necesaria
})
export class ShoppinPage implements OnInit {
  userId: number | null = null;
  invoices: any[] = [];
  selectedInvoice: any = null; // Para almacenar los detalles de la boleta seleccionada

  constructor(private router: Router, private invoiceService: InvoiceService) {}

  ngOnInit() {
    // Recupera el ID del usuario desde localStorage
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? parseInt(storedUserId, 10) : null;

    if (this.userId) {
      this.fetchInvoices(); // Cargar las boletas del usuario
    } else {
      console.log('No hay usuario conectado.');
    }
  }

  fetchInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (data) => {
        this.invoices = data.filter((invoice: any) => invoice.userId === this.userId);
        this.invoices.sort((a: any, b: any) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime());
      },
      error: (error) => {
        console.error('Error al cargar boletas:', error);
      },
    });
  }

  viewInvoiceDetails(invoiceId: number) {
    this.invoiceService.getInvoiceDetails(invoiceId).subscribe({
      next: (data) => {
        this.selectedInvoice = data; // Almacena los detalles de la boleta
      },
      error: (error) => {
        console.error('Error al cargar detalles de la boleta:', error);
      },
    });
  }

  closeInvoiceDetails() {
    this.selectedInvoice = null; // Cierra los detalles
  }

  navigateToShoppingPage() {
    this.router.navigate(['/shoppin']);
  }

  navigateToAccountPage() {
    this.router.navigate(['/acount']);
  }

  navigateToProductPage() {
    this.router.navigate(['/products']);
  }
}
