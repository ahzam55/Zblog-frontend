import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit  {
  blogArray: any[] = [];
    currentPage: number = 1;  
    totalPages: number = 1;   
    postsPerPage: number = 2;
  
    constructor(private http: HttpClient, private authService: AuthService) {
      this.getAllBlog(this.currentPage); 
    }
  
    ngOnInit(): void {
      
    }
  
    getAllBlog(page: number): void {
      this.http.get(`http://127.0.0.1:8000/publicblog/?page=${page}&limit=${this.postsPerPage}`).subscribe((resultData: any) => {
        console.log(resultData);
        if (!resultData.hasError) {
          this.blogArray = resultData.data || [];
          this.totalPages = Math.ceil(resultData.totalCount / this.postsPerPage); 
        } else {
          alert('Error fetching blog: ' + resultData.message);
        }
      });
    }
  
    changePage(page: number): void {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.getAllBlog(this.currentPage); 
      }
    }
  }
  