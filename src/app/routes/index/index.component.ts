import { Component, OnInit } from '@angular/core';
import {PlayStateService} from '../../service/states/play.state.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  animations: [
    trigger('childAnimation', [
      state('sideUp', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      state('sideDown', style({
        opacity: 0,
        transform: 'translateY(100%)',
      })),
      transition('* => *', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})
export class IndexComponent implements OnInit {

  array = [1, 2, 3, 4];

  constructor(private playService: PlayStateService) { }

  ngOnInit() {
  }

  // TODO 跳转查询结果界面
}
