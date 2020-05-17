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
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './Shared/members/member-list/member-list.component';
import { ListsComponent } from './Shared/lists/lists.component';
import { MessagesComponent } from './Shared/messages/messages.component';
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { routes } from './router';
import { MemberCardComponent } from './Shared/members/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailComponent } from './Shared/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail-resolver';
import { MemberListResolver } from './resolvers/member-list-resolver';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './Shared/members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit-resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './Shared/members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    PageNotFoundComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes),
    JwtModule.forRoot(
      {
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ["localhost:5000"],
          blacklistedRoutes: ["localhost:5000/api/auth"],
        }
      })
  ],

  providers: [
    ErrorInterceptorProvider,
     MemberDetailResolver, 
     MemberListResolver,
     MemberEditResolver,
     PreventUnsavedChanges
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }