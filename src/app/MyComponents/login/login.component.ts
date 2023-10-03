import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  email: string = '';
  password: string = '';


  // onLogin() {
  //   if (this.loginForm.valid) {
  //     const formData = this.loginForm.value;
  //     this.http.post('http://localhost:3000/api/v1/login', formData).subscribe(
  //       (response) => {
  //         console.log('Login successful', response);
  //         this.router.navigate(['/todo']);
  //       },
  //       (error) => {
  //         console.error('Login failed', error);

  //       }
  //     );
  //   }
  // }

  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.http.post('http://localhost:3000/api/v1/login', formData).subscribe(
        (response: any) => {
          if (response.token) {
            console.log('Login successful');
            console.log('Token:', response.token); // Log the token here
            this.router.navigate(['/todo']);
          } else {
            console.error('Token not found in the response');
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Handle login failure, display an error message, etc.
        }
      );
    }
  }
}
