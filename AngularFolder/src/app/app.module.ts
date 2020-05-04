import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './Shared/nav/nav.component';
import { HomeComponent } from './Shared/home/home.component';
import { RegisterComponent } from './Shared/register/register.component'
import { ErrorInterceptorProvider } from './error.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,BrowserAnimationsModule,BsDropdownModule.forRoot()
  ],

  providers: [
    ErrorInterceptorProvider
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }