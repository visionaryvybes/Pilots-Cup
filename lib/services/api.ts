import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface TrackStatus {
  trackId: string;
  status: 'available' | 'occupied' | 'maintenance';
  nextAvailableTime?: string;
}

export interface BookingData {
  id?: string;
  date: string;
  time: string;
  kartType: string;
  numberOfKarts: number;
  duration: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

// API Service class
class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize interceptors
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Track Status
  async getTrackStatus(): Promise<ApiResponse<TrackStatus>> {
    const response = await this.api.get<ApiResponse<TrackStatus>>('/track/status');
    return response.data;
  }

  // Bookings
  async createBooking(booking: Omit<BookingData, 'id' | 'status'>): Promise<ApiResponse<BookingData>> {
    const response = await this.api.post<ApiResponse<BookingData>>('/bookings', booking);
    return response.data;
  }

  async getBookings(): Promise<ApiResponse<BookingData[]>> {
    const response = await this.api.get<ApiResponse<BookingData[]>>('/bookings');
    return response.data;
  }

  async updateBooking(id: string, booking: Partial<BookingData>): Promise<ApiResponse<BookingData>> {
    const response = await this.api.patch<ApiResponse<BookingData>>(`/bookings/${id}`, booking);
    return response.data;
  }

  async deleteBooking(id: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete<ApiResponse<void>>(`/bookings/${id}`);
    return response.data;
  }

  // Authentication
  async login(credentials: { email: string; password: string }): Promise<ApiResponse<{ token: string }>> {
    const response = await this.api.post<ApiResponse<{ token: string }>>('/auth/login', credentials);
    const { data } = response.data;
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return response.data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
  }
}

export const api = ApiService.getInstance(); 