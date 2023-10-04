import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  isLoggedIn = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedIn = true;
    }
  }

  ngDoCheck(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedIn = true;
    }
  }

  loginUser() {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
  }
}
