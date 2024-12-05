export interface Rental {
    id?: number | string;
    carId?: number |string;
    startDate?: string;
    endDate?: string;
    totalPrice?: number;
    renterName?: string;
    renterContact?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Car {
    id: number;
    model: string;
    name: string;
    colour: string;
    year: number;
    pricePerDay: number;
    isAvailable: boolean;
    quantity: number;
    createdAt: string;
    updatedAt: string | null;
    rentals: Rental[]; // Array of Rental objects
  }
  
  export interface ResponseData {
    statusCode: number;
    message: string;
    data: Car[]; // Array of Car objects
  }

  export interface CarAdd {
    model: string;
    name: string;
    colour: string;
    year: number;
    pricePerDay: number;
    isAvailable: boolean;
    quantity: number;
  }
  
  