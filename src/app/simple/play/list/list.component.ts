import {Component, Input, OnInit} from '@angular/core';
import {NzDrawerRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  @Input() data;

  constructor(private drawerRef: NzDrawerRef<object>) { }

  ngOnInit() {
  }

  itemClick(item, index) {
    const result = {playData: item, index: index};
    this.drawerRef.close(result);
  }

}
