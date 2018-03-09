export interface Category {
    id: string;
    name: string;
    isSelect: boolean;
}

export interface CommentToProduct {
    prodctId: number;
    comment: string;
    grade: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    category: number;
    calories: number;
    createCountry: string;
    company: string;
    categoryValue: string;
    oldPrice: number;
    image: any;
    comments: any;
}

export interface Store {
    // Fields taken from shupersal API, keep them
    Subchainid: string;
    Storeid: string;
    Bikoretno: string;
    Storetype: string;
    Chainname: string;
    Subchainname: string;
    Storename: string;
    Address: string;
    City: string;
    Zipcode: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    gender: 1 | 2;
    // userTypeValue: string;
    role: string; // TODO: Change in script 
    isManagerChecked: boolean;
}

export interface Marker { // For gmaps
    lat: number;
    lng: number;
    label?: string; 
  }
  

