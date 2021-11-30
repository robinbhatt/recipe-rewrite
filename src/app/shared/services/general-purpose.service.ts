import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GeneralPurposeService {

  constructor(private snackBar: MatSnackBar) { }

  // "showSnackbarTopPosition('Net is offline, Trying to reconnect in 2 seconds....','Done','1000')"
  // showSnackbarTopPosition(content:string, action:, duration) {
    openSnackbar(status:string, content:string) {
    this.snackBar.open(content, 'Close', {
      duration: 4000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: (status == 'SUCCESS') ? ["success"] : (status == 'FAILURE') ? ["failure"] : (status == 'INFO') ? ["info"] : undefined
    });
  }

}
