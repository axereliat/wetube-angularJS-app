import {Injectable} from '@angular/core';
import {LoginData} from "../data/login.data";

@Injectable()
export class AuthService {

  constructor() {
  }

  saveSession(loginData: LoginData): void {
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('username', loginData.username);
    localStorage.setItem('userId', loginData.userId);
    localStorage.setItem('isAdmin', loginData.isAdmin);
  }

  getAuthToken(): string {
    return localStorage.getItem('token');
  }

  getUsername(): string {
    return localStorage.getItem('username');
  }

  destroySession(): void {
    localStorage.clear();
  }

  isAuthed(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }
}
