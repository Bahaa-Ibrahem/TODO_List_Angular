import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  error(message: string) {
    window.alert(message);
  }
}
