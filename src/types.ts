/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  details: string[];
  price: number; // in Argentine Pesos (ARS) or user currency
  priceUSD: number;
  images: string[];
  colors: ColorVariant[];
  sizes: string[];
  category: string;
  isNew?: boolean;
  stock: number;
  slug: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ColorVariant;
  selectedSize: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type PaymentStatus = 'approved' | 'pending' | 'rejected' | 'idle';

export interface CheckoutPreferenceResponse {
  id: string;
  initPoint: string;
}
