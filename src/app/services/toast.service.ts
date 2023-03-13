import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  key: string = "Toaster";
  constructor(private readonly messageService: MessageService) { }
  public addErrorMessage(detail: string): void {
    this.messageService.add(
      {
        key: this.key, severity: 'error', summary: 'Error', detail,
      },
    );
  }
  public addSuccessMessage(detail: string): void {
    this.messageService.add(
      {
        key: this.key, severity: 'success', summary: 'Success', detail,
      },
    );
  }
  public addWarnMessage(detail: string): void {
    this.messageService.add(
      {
        key: this.key, severity: 'warn', summary: 'Warn', detail,
      },
    );
  }
}
