import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ItemModel } from '../../../model/type';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-item',
  imports: [RouterOutlet, HttpClientModule, CommonModule,FormsModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {
  itemList: Array<ItemModel> = [];
  paginatedList: ItemModel[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  showForm = false;

  itemObj: ItemModel = {
    code: '',
    description: '',
    packSize: '',
    unitPrice: 0,
    qtyOnHand: 0,
  };  

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<ItemModel[]>("http://localhost:8080/item/get-all")
      .subscribe(data => {
        console.log(data);
        this.itemList = data;
        this.updatePaginatedList();
      });
  }

  deleteItem(id: string) {
    this.http.delete("http://localhost:8080/item/delete-item/" + id)
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

  saveItem() {
    this.http.post("http://localhost:8080/item/add-item", this.itemObj)
      .subscribe(() => {
        alert('Item saved successfully!');
        this.getAll();
        this.itemObj = {
          code: '',
          description: '',
          packSize: '',
          unitPrice: 0,
          qtyOnHand: 0,
        };
      });
  }

  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedList = this.itemList.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedList();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.itemList.length / this.itemsPerPage);
  }
}

