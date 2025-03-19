import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './master.service';  
import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private http: HttpClient 
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    const accessToken = this.authService.getToken();
    const refreshToken = this.authService.getRefreshToken(); 

    if (!accessToken || this.isTokenExpired(accessToken)) {
     
      if (!refreshToken) {
      
        this.clearStorageAndRedirect();
        return of(false);
      }

      return this.refreshAccessToken(refreshToken).pipe(
        switchMap((newAccessToken: string | null) => {
          if (newAccessToken) {
            this.authService.setToken(newAccessToken); 
            return this.checkUserRole(next);
          }
         
          this.clearStorageAndRedirect();
          return of(false);
        }),
        catchError(() => {
        
          this.clearStorageAndRedirect();
          return of(false);
        })
      );
    }

   
    return this.checkUserRole(next);
  }

  private checkUserRole(next: ActivatedRouteSnapshot): Observable<boolean> {
    const accessToken = this.authService.getToken();
    if (!accessToken) {
      this.clearStorageAndRedirect(); 
      return of(false);
    }
    const decoded: any = jwtDecode(accessToken);
    const userRole = decoded.role;
    const requiredRole = next.data['role'];

    if (requiredRole && userRole === requiredRole) {
      return of(true);
    }

    this.clearStorageAndRedirect();
    return of(false);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);  
      const currentTime = Math.floor(Date.now() / 1000); 
      return decoded.exp < currentTime; 
    } catch (error) {
      return true;  
    }
  }

  private refreshAccessToken(refreshToken: string): Observable<string | null> {
    const url = 'http://127.0.0.1:8000/api/token/refresh/';
    
    return this.http.post<any>(url, { refresh_token: refreshToken }).pipe(
      switchMap((response) => {
        if (response && response.access_token) {
          return of(response.access_token);
        } else {
          return of(null); 
        }
      })
    );
  }

  private clearStorageAndRedirect(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
