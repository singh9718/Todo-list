import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  isConfirmPasswordTouched: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  email: string = '';
  password: string = '';
  confirmpassword: string = '';

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordsNotMatching: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  setPasswordTouched() {
    this.isConfirmPasswordTouched = true;
  }

  onSignup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.apiService.signup(formData).subscribe(
        (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
    }
  }
}
