import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../master.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myblog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css'],
})
export class MyblogComponent {
  blogArray: any[] = [];
  user_id: string = '';
  filterStatus: string = '';  
  searchTitle: string = '';   
  pageNumber: number = 1;    
  pageSize: number = 2;     
  totalPages: number = 1;     

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getUserIdFromToken();
    this.getMyBlog();
  }

  ngOnInit(): void {}

  getUserIdFromToken(): void {
    const accessToken = this.authService.getToken();
    if (accessToken) {
      try {
        const decoded: any = jwtDecode(accessToken);
        this.user_id = decoded.id;
      } catch (error) {
        console.error('Error decoding token:', error);
        this.user_id = '';
      }
    } else {
      console.error('No access token found');
      this.user_id = '';
    }
  }

  getMyBlog(): void {
    if (this.user_id) {
      let apiUrl = `http://127.0.0.1:8000/blog/?page=${this.pageNumber}&page_size=${this.pageSize}`;

      if (this.filterStatus) {
        apiUrl += `&status=${this.filterStatus}`;
      }
      if (this.searchTitle) {
        apiUrl += `&title=${this.searchTitle}`;
      }

      this.http.get(apiUrl).subscribe(
        (resultData: any) => {
          console.log(resultData);
          if (resultData && !resultData.hasError) {
            this.blogArray = resultData.data || [];
            this.pageNumber = resultData.page;
            this.totalPages = resultData.total_pages;
          } else {
            alert('Error fetching blog: ' + resultData.message);
          }
        },
        (error) => {
          console.error('Error fetching blogs:', error);
        }
      );
    } else {
      console.error('User ID is not available');
    }
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageNumber = newPage;
      this.getMyBlog();
    }
  }
}
