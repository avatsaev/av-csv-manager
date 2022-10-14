import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CsvService } from '@app/services/csv.service';

@Component({
  selector: 'app-duplicates-manager',
  templateUrl: './duplicates-manager.component.html',
  styleUrls: ['./duplicates-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DuplicatesManagerComponent implements OnInit {
  availableProps = this.csv.processedProps;
  availablePropsTable = this.csv.processedProps.map((p) => ({ prop: p }));

  duplicatedEntries = [];

  models = this.availableProps.reduce(
    (prev, prop) => ({ ...prev, [prop]: false }),
    {}
  );

  constructor(public csv: CsvService) {}

  onPropChange(c, p) {
    this.models[p] = c;
  }

  scanForDupes() {
    const keys = Object.entries(this.models)
      .filter(([k, v]) => v)
      .map(([k, v]) => k);

    console.log(keys);

    //Ladevorgang

    this.duplicatedEntries = this.csv.detectDupes(keys);
  }

  ngOnInit(): void {}
}
