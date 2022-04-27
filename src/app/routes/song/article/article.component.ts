import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit, OnChanges {

  @Input() data;

  imgSrc: string;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.setImgSrc();
  }

  setImgSrc() {
    console.log(this.data, '图片数据');
    if (this.data && this.data[0]) {
      const src = `assets/product-mind/article/${this.data[0]}.png`;
      this.imgSrc = src;
    }
  }

}
