import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ITableConfig } from '@shared/interfaces';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'ims-table',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IMSTableComponent {
  @Input({ required: true }) configTable!: ITableConfig;
  @Input({ required: true }) tableData: any[] = [];
  @Input() rows: 10 | 20 | 50 | 100 = 10;
  @Output() fileSelections = new EventEmitter<any[]>();
  @Input() showTemplate: boolean = false;
  selection: any[] = [];

  @ContentChild('tableTemplate', { static: true })
  tableTemplate!: TemplateRef<any>;
  first = 0;

  sendSelection() {
    this.fileSelections.emit(this.selection);
  }

  hasSelection(): boolean {
    return this.selection.length > 0;
  }

  onRowSelect(event: any) {
    this.selection = event;
    this.sendSelection();
  }

  onRowUnselect(event: any) {
    this.selection = event;
    this.sendSelection();
  }
}
