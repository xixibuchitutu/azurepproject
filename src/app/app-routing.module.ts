import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {HomeComponent} from "./pages/home/home.component";
import {DetailComponent} from "./pages/home/detail/detail.component";
import { FriendsComponent } from './friends/friends.component';
import { ShowfriendsComponent } from './showfriends/showfriends.component';
import { AddComponent } from './pages/home/add/add.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: "full"
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'detail', component: DetailComponent
  },{
    path:'friends',component:FriendsComponent
  },
  {
    path:'showfriends',component:ShowfriendsComponent
  },
  {
    path:'add',component:AddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
