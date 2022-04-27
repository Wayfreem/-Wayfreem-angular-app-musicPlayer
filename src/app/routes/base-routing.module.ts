import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {IndexComponent} from './index/index.component';
import {AlbumComponent} from './album/album.component';
import {SongComponent} from './song/song.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {
    path: 'index', component: IndexComponent, children: []
  },
  {
    path: 'album/:albumId', component: AlbumComponent,
  },
  {
    path: 'song/:songId', component: SongComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {
}
