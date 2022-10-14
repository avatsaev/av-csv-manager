import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuplicatesManagerComponent } from '@app/duplicates-manager/duplicates-manager.component';
import { PreviewComponent } from '@app/preview/preview.component';

const routes: Routes = [
  { path: 'duplicates', component: DuplicatesManagerComponent },
  { path: 'preview', component: PreviewComponent },
  { path: '**', redirectTo: '/preview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
