import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CsvService } from '@app/services/csv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  displayedColumns = this.csv?.processedProps?.map((p) => ({ prop: p }));
  dataSource = this.csv?.processedData;
  @ViewChild('table') table;

  constructor(
    public csv: CsvService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.csv.dataLoaded$.subscribe(() => {
      console.log('|Loaded');
      this.displayedColumns = this.csv?.processedProps?.map((p) => ({
        prop: p,
      }));
      this.dataSource = this.csv?.processedData;
      this.table.recalculate();
      this.cdr.markForCheck();
    });
  }
}
