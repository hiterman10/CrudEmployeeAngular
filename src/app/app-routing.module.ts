import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './modules/general/home/home.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/general/contact/contact.module').then(
        (mod) => mod.ContactModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./modules/general/about/about.module').then(
        (mod) => mod.AboutModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./modules/general/signin/signin.module').then(
        (mod) => mod.SigninModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
