import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageSrv: MessageService) { }

  showToastSucess(text: string, closable: boolean = true): void {
    this.messageSrv.add(
      { severity: 'success', detail: text, key: 'toast-sucess', closable: closable });
  }

  showToastError(text: string, closable: boolean = true): void {
    this.messageSrv.add(
      { severity: 'error', detail: text, key: 'toast-error', closable: closable });
  }
}
