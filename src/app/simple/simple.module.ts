import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SimpleRoutingModule} from './simple-routing.module';
import { IndexComponent } from './index/index.component';
import { PlayComponent } from './play/play.component';
import { ListComponent } from './play/list/list.component';
import { ArticleComponent } from './play/article/article.component';



@NgModule({
  declarations: [PlayComponent, ListComponent, IndexComponent, ArticleComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SimpleRoutingModule,
    NgZorroAntdModule,
  ],
  entryComponents:[ListComponent, ArticleComponent]
})
export class SimpleModule { }
