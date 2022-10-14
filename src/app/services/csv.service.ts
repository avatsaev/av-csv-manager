import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { BehaviorSubject, delay, Subject } from 'rxjs';
import { clone } from 'lodash';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  err = null;
  private _file$$ = new BehaviorSubject<File | null>(null);

  private _originalCsvData: any[] = [];
  private _processedCsvData: any[] = [];
  private _originalCsvProps: string[];
  private _processedCsvProps: string[];

  file$ = this._file$$.asObservable();

  private _dataLoaded$$ = new Subject();
  dataLoaded$ = this._dataLoaded$$.asObservable();

  private _working$$ = new BehaviorSubject(false);
  working$ = this._working$$.asObservable().pipe(delay(3000));

  duplicatePropControls = this.processedProps.map((p) => ({
    [p]: new FormControl(false),
  }));

  get working() {
    return this._working$$.getValue();
  }

  get dataLoaded() {
    return !this.working && this.originalData.length;
  }

  set file(file: File | null) {
    this._file$$.next(file);
  }

  get file() {
    return this._file$$.getValue();
  }

  get originalData() {
    return this._originalCsvData;
  }

  set originalData(originalData: any[]) {
    this._originalCsvData = originalData;
  }

  set originalProps(originalProps: any[]) {
    this._originalCsvProps = originalProps;
  }

  get originalProps() {
    return this._originalCsvProps;
  }

  get processedData() {
    return this._processedCsvData;
  }

  set processedData(data: any[]) {
    this._processedCsvData = data;
  }

  get processedProps() {
    return this._processedCsvProps ?? [];
  }

  set processedProps(props: string[]) {
    this._processedCsvProps = props;
  }

  constructor(private papa: Papa) {
    this.file$.subscribe(() => this.parseFile());
  }

  parseFile() {
    if (this.file) {
      this._working$$.next(true);
      this.papa.parse(this.file, {
        worker: false,
        header: true,
        fastMode: false,
        skipEmptyLines: true,
        dynamicTyping: true,
        step: (results) => {
          // console.log(results.data);
          // console.log(results.errors);
          if (!results.errors.length) {
            this._originalCsvData.push(results.data);
          }
        },
        error: (err) => {
          this._working$$.next(false);
          this.err = err;
          console.log(err);
        },
        complete: (res) => {
          this._originalCsvProps = Object.keys(this._originalCsvData[0]);

          this.postProcessData();
          console.log(this._processedCsvProps);
          console.log(this._processedCsvData);
          this._working$$.next(false);
          this._dataLoaded$$.next(this.originalData);
        },
      });
    }
  }

  postProcessData() {
    this._processedCsvData = clone(this._originalCsvData);
    this._processedCsvProps = clone(this._originalCsvProps);
    for (let data of this._processedCsvData) {
      for (let [k, v] of Object.entries(data)) {
        if (typeof v === 'string' || v instanceof String) {
          data[k] = v.replaceAll('"', '');
        }
      }
    }

    for (let data of this._processedCsvProps) {
      if (typeof data === 'string') {
        const index = this._processedCsvProps.indexOf(data);
        this._processedCsvProps[index] = data.trim().replaceAll('"', '');
      }
    }
  }

  detectDupes(props: string[]) {
    console.log('props', props);
    console.log('--------------------------');
    const dupeDataPoints = [];
    if (props.length) {
      for (let [i, dataPointA] of this.processedData.entries()) {
        for (let [j, dataPointB] of this.processedData.entries()) {
          if (i !== j) {
            const checkArr = [];
            for (let k of props) {
              if (dataPointA[k] === dataPointB[k]) {
                checkArr.push(true);
              } else {
                checkArr.push(false);
              }
            }
            if (checkArr.every((r) => r === true)) {
              dupeDataPoints.push(dataPointA);
            }
          }
        }
      }

      console.log('DETECTED DUPES', dupeDataPoints);
    }

    return dupeDataPoints;
  }
}
