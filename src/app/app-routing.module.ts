import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./select-doc/select-doc.component').then(
        (c) => c.SelectDocComponent
      ),
  },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./doc-view/doc-view.component').then((c) => c.DocViewComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
