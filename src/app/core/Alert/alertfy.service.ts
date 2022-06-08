import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertfyService {
  error(error: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
