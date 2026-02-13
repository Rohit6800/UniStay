
export enum UserRole {
  STUDENT = 'STUDENT',
  DEALER = 'DEALER'
}

export type RoomType = 'Single' | 'Sharing' | 'PG';

export interface Amenity {
  name: string;
  icon: string;
}

export interface SafetyStats {
  rating: number; // 0-5
  policeProximity: string;
  lighting: string;
}

export interface Review {
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Room {
  id: string;
  title: string;
  type: RoomType;
  rent: number;
  deposit: number;
  location: string;
  state: string;
  city: string;
  collegeName: string;
  distance: number; // in km
  photos: string[];
  isVerified: boolean;
  isFeatured: boolean;
  amenities: string[];
  furnished: boolean;
  attachedBathroom: boolean;
  ac: boolean;
  genderPref: 'Girls' | 'Boys' | 'Co-ed';
  availableFrom: string;
  rules: string[];
  ownerName: string;
  ownerPhone: string;
  safety: SafetyStats;
  reviews: Review[];
  coordinates: { lat: number; lng: number };
}

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
}
