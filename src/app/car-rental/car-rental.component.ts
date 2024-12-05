import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Car, Rental } from '../types/car';

@Component({
  selector: 'app-car-rental',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './car-rental.component.html',
  styleUrls: ['../app.component.css'],
})
export class CarRentalComponent implements OnInit {
  id: string | null = null; // Rental ID from the route
  rental: any  = {}; // Stores rental data
  rentalForm:Rental = {}; // Stores form data for creating or updating rentals

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initializeRentalForm();
    if (this.id) {
      this.getCarById(this.id); // Fetch rental if an ID exists
    }
  }

  initializeRentalForm(): void {
    this.rentalForm = {
      carId: this.id? this.id: 0,
      startDate: '',
      endDate: '',
      totalPrice: 0,
      renterName: '',
      renterContact: '',
    };
  }

  getCarById(id: string): void {
    this.http.get(`https://localhost:7080/api/cars/${id}`).subscribe({
      next: (response: any) => {
        this.rental = response.data; // Assign rental data
        console.log('Rental fetched:', this.rental);
        // Populate form with existing rental details
        this.rentalForm = {
          carId: this.rental.carId || this.id,
          startDate: this.rental.startDate || '',
          endDate: this.rental.endDate || '',
          totalPrice: this.rental.totalPrice || null,
          renterName: this.rental.renterName || '',
          renterContact: this.rental.renterContact || '',
        };
      },
      error: (err) => {
        console.error('Error fetching rental:', err);
      },
    });
  }

  createRental(): void {
    console.log('Creating rental:', this.rentalForm);

    this.http.post('https://localhost:7080/api/rentals', this.rentalForm).subscribe({
      next: (response) => {
        console.log('Rental created successfully:', response);
        alert('Rental created successfully!');
        this.resetForm();
        window.location.reload()
      },
      error: (err) => {
        console.error('Error creating rental:', err);
        alert('An error occurred while creating the rental. Please try again.');
      },
    });
  }

  updateRental(rental: any): void {
    console.log('Updating rental:', rental);
  
    this.http.put(`https://localhost:7080/api/rentals/${rental.id}`, rental).subscribe({
      next: (response) => {
        console.log('Rental updated successfully:', response);
        alert('Rental updated successfully!');
      },
      error: (err) => {
        console.error('Error updating rental:', err);
        alert('An error occurred while updating the rental. Please try again.');
      },
    });
  }
  

  deleteRental(id: number): void {
    if (confirm('Are you sure you want to delete this rental?')) {
      this.http.delete(`https://localhost:7080/api/rentals/${id}`).subscribe({
        next: (response) => {
          console.log('Rental deleted successfully:', response);
          alert('Rental deleted successfully!');
          this.rental = {};
          this.resetForm();
          window.location.reload()
        },
        error: (err) => {
          console.error('Error deleting rental:', err);
          alert('An error occurred while deleting the rental. Please try again.');
        },
      });
    }
  }

  resetForm(): void {
    this.initializeRentalForm();
  }
}

