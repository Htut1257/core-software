import { Component, OnInit ,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ToastEvent } from 'src/app/core/models/toast-event.model';
import { ToastsService } from '../../toasts.service';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];
  constructor(private toastService: ToastsService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscribetoToast();
  }

  subscribetoToast() {
    this.toastService.toastEvents.subscribe(toasts => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast)
      this.cdr.detectChanges()
    })
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }

}
