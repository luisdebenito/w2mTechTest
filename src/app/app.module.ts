import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrimeNgModule } from './shared/prime-ng.module';
import { SuperheroComponent } from './superhero/superhero.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaitingSpinnerComponent } from './shared/waiting-spinner/waiting-spinner.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastService } from './shared/toast.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CapitalizeDirective } from './shared/capitalize.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WaitingInterceptor } from './shared/waiting.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SuperheroComponent,
    WaitingSpinnerComponent,
    CapitalizeDirective,
  ],
  imports: [
    BrowserModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    MessageService,
    ToastService,
    ConfirmationService,
    //there are no http requests but in case there were...
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WaitingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
