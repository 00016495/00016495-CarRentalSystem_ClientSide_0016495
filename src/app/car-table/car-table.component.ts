import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Car } from '../types/car';

@Component({
  selector: 'app-car-table',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterOutlet, RouterModule, HttpClientModule], // Include HttpClientModule
  templateUrl: './car-table.component.html',
  styleUrls: ['../app.component.css'],
})
export class CarTableComponent implements OnInit {
  cars: Car[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getCars();
  }

  addCarToTable(newCar: any) {
    this.cars.push(newCar); // Add the new car to the table
  }

  getCars() {
    this.http.get('https://localhost:7080/api/cars').subscribe({
      next: (response: any) => {
        this.cars = response.data;
        console.log(this.cars);
      },
      error: (err) => {
        console.error('Error fetching', err);
      },
    });
  }

  deleteCar(id: number) {
    this.http.delete(`https://localhost:7080/api/cars/${id}`).subscribe({
      next: () => {
        console.log(`car with ID ${id} deleted successfully.`);
        this.cars = this.cars.filter((car) => car.id !== id);
      },
      error: (err) => {
        console.error('Error deleting:', err);
      },
    });
  }

  editCar(id: number) {
    this.router.navigate([`/rent/${id}`]); // Navigates to /edit/1 for id = 1
  }
  
}
