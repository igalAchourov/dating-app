import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './Shared/home/home.component'
import { MemberListComponent } from './Shared/members/member-list/member-list.component'
import { MessagesComponent } from './Shared/messages/messages.component'
import { ListsComponent } from './Shared/lists/lists.component'
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component'
import { AuthGuard } from './guards/auth.guard'
import { MemberDetailComponent } from './Shared/members/member-detail/member-detail.component'
import { MemberDetailResolver } from './resolvers/member-detail.resolver'
import { MemberListResolver } from './resolvers/member-list.resolver'
import { MemberEditComponent } from './Shared/members/member-edit/member-edit.component'
import { MemberEditResolver } from './resolvers/member-edit.resolver'
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard'
import { ListsResolver } from './resolvers/lists.resolver'
import { MessagesResolver } from './resolvers/messages.resolver'


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    // protecting routes with a single route guard using dummy routes
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            /*you can use single "canActivate" for each route also canActivate:[AuthGuard]*/
            { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
            { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
            { path: 'member/edit', component: MemberEditComponent, resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent ,resolve:{messages:MessagesResolver}},
            { path: 'lists', component: ListsComponent, resolve: { users: ListsResolver } },

        ]
    },


    { path: '**', component: PageNotFoundComponent },


]