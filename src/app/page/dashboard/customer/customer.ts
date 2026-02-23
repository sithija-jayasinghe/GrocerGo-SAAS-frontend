import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerModel } from '../../../model/type';

@Component({
  standalone: true,
  selector: 'app-customer',
  imports: [RouterOutlet, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  customerList: Array<CustomerModel> = [];
  paginatedList: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  showForm = false;

  customerObj: CustomerModel = {
    id: '',
    title: '',
    name: '',
    dob: '',
    salary: 0,
    address: '',
    city: '',
    province: '',
    postalcode: '',
  };

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<CustomerModel[]>("http://localhost:8080/customer/get-all")
      .subscribe(data => {
        console.log(data);
        this.customerList = data;
        this.updatePaginatedList();
      });
  }

  deleteCustomer(id: string) {
    this.http.delete("http://localhost:8080/customer/delete-customer/" + id)
      .subscribe({
        next: (response) => {
          console.log("Deleted successfully");
          this.getAll();
        },
        error: (err) => {
          console.error("Delete failed", err);
        }
      });
  }

  saveCustomer() {
    this.http.post("http://localhost:8080/customer/add-customer", this.customerObj)
      .subscribe(() => {
        alert('Customer saved successfully!');
        this.getAll();
        this.showForm = false;
        this.customerObj = {
          id: '',
          title: '',
          name: '',
          dob: '',
          salary: 0,
          address: '',
          city: '',
          province: '',
          postalcode: '',
        };
      });
  }

  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedList = this.customerList.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedList();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.customerList.length / this.itemsPerPage);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const pages = [];
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }
}
