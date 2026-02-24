import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  ngOnInit(): void {
    setTimeout(() => initFlowbite(), 100);
  }

}
