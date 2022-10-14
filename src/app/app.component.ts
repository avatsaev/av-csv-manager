import { Component } from '@angular/core';
import { CsvService } from '@app/services/csv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  displayedColumns: string[] = this.csv.processedProps;
  dataSource = this.csv.processedData;
  constructor(public csv: CsvService, private router: Router) {}

  onFileUpload(e) {
    const file = e?.target?.files?.item(0);
    if (file) {
      this.csv.file = file;
    }
  }

  onDupes() {
    this.router.navigate(['/duplicates']);
  }
  onHome() {
    this.router.navigate(['/']);
  }
}
