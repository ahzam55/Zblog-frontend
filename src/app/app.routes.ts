import { Routes } from '@angular/router';
import { GuestmasterComponent } from './guest/guestmaster/guestmaster.component';
import { GuesthomeComponent } from './guest/guesthome/guesthome.component';
import { SigninComponent } from './guest/signin/signin.component';
import { SignupComponent } from './guest/signup/signup.component';
import { BlogComponent } from './guest/blog/blog.component';
import { UsermasterComponent } from './user/usermaster/usermaster.component';
import { UserhomeComponent } from './user/userhome/userhome.component';
import { ContactComponent } from './user/contact/contact.component';
import { BloglistComponent } from './user/bloglist/bloglist.component';
import { AuthGuard } from './auth.guard';
import { MyblogComponent } from './user/myblog/myblog.component';
import { BlogregComponent } from './user/blogreg/blogreg.component';

export const routes: Routes = [

    { 
        path: 'guest', 
        component: GuestmasterComponent,
        children: [
          { path: '', component: GuesthomeComponent },
          { path: 'signin', component: SigninComponent },
          { path: 'signup', component: SignupComponent }, 
          { path: 'blog', component: BlogComponent },  
        ]
      },

      { 
        path: 'user', 
        component: UsermasterComponent,
        canActivate: [AuthGuard],
        data: { role: 'user' },
        children: [
          { path: 'userhome', component: UserhomeComponent },
          { path: 'signup', component: ContactComponent }, 
          { path: 'blog', component: BloglistComponent }, 
          { path: 'myblog', component: MyblogComponent }, 
          { path: 'blogreg', component: BlogregComponent },  
        ]
      },


      { path: '', redirectTo: '/guest', pathMatch: 'full' } 
];
