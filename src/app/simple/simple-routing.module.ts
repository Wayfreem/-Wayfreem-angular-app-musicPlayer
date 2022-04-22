import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IndexComponent} from './index/index.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {
    path: 'index', component: IndexComponent, children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimpleRoutingModule {
}
