import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './Shared/home/home.component'
import { MemberListComponent } from './Shared/member-list/member-list.component'
import { MessagesComponent } from './Shared/messages/messages.component'
import { ListsComponent } from './Shared/lists/lists.component'
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component'
import { AuthGuard } from './guards/auth.guard'


export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    // protecting routes with a single route guard using dummy routes
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent /*you can use single "canActivate" for each route also canActivate:[AuthGuard]*/ },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent },
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: '**', component: PageNotFoundComponent },


]