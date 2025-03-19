import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken && !this.isTokenExpired(accessToken); 
  }

  
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

 
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

 
  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  
  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.clear();
    this.router.navigate(['/']); 
  }

  
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }
}
