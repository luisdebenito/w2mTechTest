import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ToastContentComponent } from './toast-content/toast-content.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

const modules = [
  ButtonModule,
  DialogModule,
  ConfirmDialogModule,
  ToastModule,
  TableModule,
  InputTextModule,
];

@NgModule({
  declarations: [ToastContentComponent],
  imports: [CommonModule, modules],
  exports: [modules, ToastContentComponent],
})
export class PrimeNgModule {}
