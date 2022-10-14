import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DuplicatesManagerComponent } from './duplicates-manager/duplicates-manager.component';
import { MatTableModule } from '@angular/material/table';
import { PreviewComponent } from './preview/preview.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, DuplicatesManagerComponent, PreviewComponent],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NgxDatatableModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
