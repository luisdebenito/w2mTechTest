import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaitingService {

  constructor() { }

  private _showWaiting = new BehaviorSubject<boolean>(false);
  public showWaiting = this._showWaiting.asObservable();

  public startWaiting(){
    this._showWaiting.next(true);
  }

  public stopWaiting(){
    this._showWaiting.next(false);
  }
}
