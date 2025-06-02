import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'ims-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [DialogModule],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PopupComponent {
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() data: any = null;
  @Input() width: string = '50vw';
  @Output() closePopup = new EventEmitter<void>();

  dynamicWidth: string = this.width;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustWidth();
  }

  ngOnInit() {
    this.adjustWidth();
  }

  adjustWidth() {
    if (window.innerWidth <= 768) {
      this.dynamicWidth = '90vw';
    } else {
      this.dynamicWidth = this.width;
    }
  }

  closeDialog() {
    this.closePopup.emit();
  }
}
