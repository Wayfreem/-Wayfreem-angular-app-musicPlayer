import {Component, Input, OnInit} from '@angular/core';
import {NzDrawerRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.less']
})
export class PlayListComponent implements OnInit {

  @Input() data;

  constructor(private drawerRef: NzDrawerRef<object>) { }

  ngOnInit() {
    console.log(this.data);
  }

  itemClick(item) {
    this.drawerRef.close(item);
  }

}
