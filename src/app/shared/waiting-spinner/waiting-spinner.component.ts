import { Component, OnDestroy, OnInit } from '@angular/core';
import { WaitingService } from '../waiting.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-waiting-spinner',
  templateUrl: './waiting-spinner.component.html',
  styleUrls: ['./waiting-spinner.component.scss']
})
export class WaitingSpinnerComponent implements OnInit, OnDestroy {

  constructor(
    private waitingService: WaitingService
  ) { }

  showMe = false;

  private subs: SubSink = new SubSink();

  ngOnInit(): void {
    this.subs.sink = this.waitingService.showWaiting.subscribe(res => {
      this.showMe = res;
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
