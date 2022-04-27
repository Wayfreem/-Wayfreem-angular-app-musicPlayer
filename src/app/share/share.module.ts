import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerControlComponent} from './player-control/player-control.component';
import {PlayerComponent} from './player/player.component';
import {PlayListComponent} from './play-list/play-list.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [PlayerControlComponent, PlayerComponent, PlayListComponent],
  exports: [
    PlayerControlComponent,
    PlayerComponent,
  ],
  entryComponents: [PlayListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule
  ]
})
export class ShareModule {
}
