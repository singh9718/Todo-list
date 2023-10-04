import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  email: string = '';
  password: string = '';

  onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.apiService.login(formData).subscribe(
        (response: any) => {
          if (response.token) {
            console.log('Login successful');
            console.log('Token:', response.token);
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/todo']);
          } else {
            console.error('Token not found in the response');
          }
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }

  ngOnInit() {}
}
