import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarAdd } from '../types/car';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['../app.component.css']
})
export class HeaderComponent {
  @Output() carAdded = new EventEmitter<any>();

  newCar: CarAdd = {
    model: '',
    name: '',
    colour: '',
    year: 0,
    pricePerDay: 0,
    isAvailable: true,
    quantity: 0
  };

  constructor(private http: HttpClient) {}

  addCar() {
    if (!this.newCar.name.trim() || !this.newCar.model.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    console.log(this.newCar);
    

    this.http.post('https://localhost:7080/api/cars', this.newCar)
      .subscribe({
        next: (response) => {
          console.log('Car added successfully:', response);
          alert('Car added successfully!');
          this.carAdded.emit(response); // Emit the new car to the parent
          this.resetForm();
          window.location.reload()
        },
        error: (error) => {
          console.error('Error adding car:', error);
        }
      });
  }

  resetForm() {
    this.newCar = {
      model: '',
      name: '',
      colour: '',
      year: 0,
      pricePerDay: 0,
      isAvailable: true,
      quantity: 0
    };
  }
}
