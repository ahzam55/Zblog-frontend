import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usermaster',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './usermaster.component.html',
  styleUrl: './usermaster.component.css'
})
export class UsermasterComponent {
  user_id: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    
  }

  logout() {
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    

    sessionStorage.clear();

    this.router.navigate(['/']);
  }

}
