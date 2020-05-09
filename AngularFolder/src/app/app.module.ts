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
import { MemberListComponent } from './Shared/member-list/member-list.component';
import { ListsComponent } from './Shared/lists/lists.component';
import { MessagesComponent } from './Shared/messages/messages.component';
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { routes } from './router';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes)
  ],

  providers: [
    ErrorInterceptorProvider
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }