import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,FormsModule, CommonModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  password: string = '';
  username: string = '';
  email: string = '';
  role: string = 'user';
  contact_no: string = '';

  constructor(private http: HttpClient, private router: Router) { 
    
  }

  ngOnInit(): void {}
  

  saveRecords() {
    const bodyData = {
      password: this.password,
      username: this.username,
      email: this.email,
      role: this.role,
      contact_no: this.contact_no,
    };

    console.log(bodyData);

    this.http.post('http://127.0.0.1:8000/signup/', bodyData).subscribe((resultData: any) => {
      console.log(resultData);

      if (resultData?.hasError) {
        alert(`Error: ${resultData.message}`);
      } else {
        alert('User Registered Successfully');
        this.clearForm();
        this.router.navigate(['/guest/signin']);
      }
    }, (error) => {
      console.error('Error occurred:', error);
      alert('An error occurred while registering the user.');
    });
  }
 
  clearForm() {
    this.password = '';
    this.username = '';
    this.email = '';
    this.contact_no = '';
  }

  hidePassword: boolean = true; 


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}
