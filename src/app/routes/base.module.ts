import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BaseRoutingModule} from './base-routing.module';
import {IndexComponent} from './index/index.component';
import {SongComponent} from './song/song.component';
import {AlbumListComponent} from './index/album-list/album-list.component';
import {ArticleComponent} from './song/article/article.component';
import {AlbumComponent} from './album/album.component';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [SongComponent, AlbumListComponent, IndexComponent, ArticleComponent, AlbumComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BaseRoutingModule,
    NgZorroAntdModule,
    ScrollingModule,
  ],
  entryComponents: [AlbumListComponent, ArticleComponent]
})
export class BaseModule {
}
