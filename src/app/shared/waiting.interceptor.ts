import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { WaitingService } from './waiting.service';

@Injectable()
export class WaitingInterceptor implements HttpInterceptor {
  constructor(private waitingService: WaitingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.waitingService.startWaiting();

    return next.handle(request).pipe(
      finalize(() => {
        this.waitingService.stopWaiting();
      })
    );
  }
}