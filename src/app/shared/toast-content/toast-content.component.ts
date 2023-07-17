import { Component} from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast-content',
  templateUrl: './toast-content.component.html',
  styleUrls: ['./toast-content.component.scss']
})
export class ToastContentComponent {

  constructor(private messageSrv: MessageService) { }

  close(): void {
    this.messageSrv.clear('toast-error');
  }

}
