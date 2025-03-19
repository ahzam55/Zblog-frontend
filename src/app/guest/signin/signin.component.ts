import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [RouterLink,HttpClientModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  password: string = ''; 
  username: string = ''; 

  constructor(private http: HttpClient, private router: Router) {}

  saveRecords() {
    let bodyData = {
      password: this.password,
      username: this.username,
      
    };
    console.log(bodyData);

    this.http.post('http://127.0.0.1:8000/signin/', bodyData).subscribe(
      (resultData: any) => {
        // console.log(resultData);
        // console.log(resultData.user_id);

        if (resultData.hasError === false) {
          if (resultData.data && resultData.data.access_token && resultData.data.refresh_token) {
            // Storing tokens in localStorage
            localStorage.setItem('access_token', resultData.data.access_token);
            localStorage.setItem('refresh_token', resultData.data.refresh_token);
            // console.log('Access Token:', resultData.data.access_token);
            // console.log('Refresh Token:', resultData.data.refresh_token);
          }
        
          if (resultData.data && resultData.data.redirect === 'userhome') {
            // Navigate to userhome
            this.router.navigate(['user/userhome']);
          }
        } else {
          alert(resultData.message || 'An error occurred');
        }
      },
      (error) => {
        console.error('Error occurred', error);
        alert('Incorrect username or password');
      }
    );
  }
}


