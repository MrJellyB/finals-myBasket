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
  ManufacturerItemDescription: string;
  UnitQty: string;
  UnitOfMeasure: string;
  UnitOfMeasurePrice: number;
  Quantity: number;
  comments: string[];
  image?: any;
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
  //gender: 1 | 2;
  gender: number;
  userTypeValue: string;
  genderValue: string;
  role: string; // TODO: Change in script 
  isManagerChecked: boolean;
  userType: number;
  profile: ProfileBuilder;
}

export interface Marker { // For gmaps
  lat: number;
  lng: number;
  label?: string;
}

export interface Basket {
  basketItems: BasketItem[];
  totalPrice: number;
  id: number;
  streetName: string;
  userName?: string;
}

export interface BasketItem {
  id: number;
  name: string;
  image: string;
  price: number;
  amount: number;
}

export interface ProductToGrades {
  productId: number;
  TotalGrades: number
}


export interface CategoryToProduct {
  category: number;
  ListProductsAndGrades: Array<ProductToGrades>
}

export interface FamilyData {
  adults: number;
  kids: number;
  babies: number;
}

export interface Preferences {
  kosher: boolean;
  vegan: boolean;
  veggie: boolean;
}

export interface Avoidness {
  eggs: boolean;
  milk: boolean;
  gluten: boolean;
  soy: boolean;
  nuts: boolean;
  peanuts: boolean;
  ful: boolean;
}

export interface UserAddress {
  city: number;
  street: string;
}

export interface ProfileBuilder {
  birthdate: Date;
  address: UserAddress;
  peopleAmount: FamilyData;
  preferences: Preferences;
  avoidness: Avoidness;
}

export interface City {
  _id: number;
  cityName: string;
}
