import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../master.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-blogreg',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blogreg.component.html',
  styleUrl: './blogreg.component.css'
})
export class BlogregComponent {
  blogArray: any[] = []; 
  title: string = '';
  content: string = '';
  status: string = '';
  user_id: string = ''; 
  currentblogID = '';
  filterStatus: string = ''; 
  searchTitle: string = '';  
  pageNumber: number = 1;    
  pageSize: number = 2;      
  totalPages: number = 1;    
  constructor(private http: HttpClient, private router: Router , private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getUserIdFromToken(); 
    this.getMyBlog(); 
  }

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

  saveOrUpdateRecords() {
    let bodyData = {
      title: this.title,
      content: this.content,
      status: this.status,
      user_id: this.user_id,
    };

    if (this.currentblogID) {
      console.log(this.currentblogID)
      this.http.put(`http://127.0.0.1:8000/blog/${this.currentblogID}`, bodyData)
           
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Error updating blog');
          }
        );
    } else {
      this.http.post('http://127.0.0.1:8000/blog/', bodyData)
        .subscribe(
          (resultData: any) => {
            this.handleApiResponse(resultData);
          },
          (error) => {
            console.error(error);
            alert('Error registering blog');
          }
        );
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

  setUpdate(data: any) {
    this.title = data.title;
    this.content = data.content;
    this.status = data.status;
    this.currentblogID = data.id;
  }

  setDelete(data: any) {
    this.http.delete(`http://127.0.0.1:8000/blog/${data.id}`)
      .subscribe(
        (resultData: any) => {
          this.handleApiResponse(resultData);
        },
        (error) => {
          console.error(error);
          alert('Error deleting blog');
        }
      );
  }

  handleApiResponse(resultData: any) {
    if (resultData.hasError) {
      alert(`Error: ${resultData.message}`);
    } else {
      alert(resultData.message || 'Operation successful');
      this.clearForm();
      this.getMyBlog();
    }
  }

  clearForm() {
    this.title = '';
    this.content = '';
    this.status = '';
    this.currentblogID = '';
  }
}
