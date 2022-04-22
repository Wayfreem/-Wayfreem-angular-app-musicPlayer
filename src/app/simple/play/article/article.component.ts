import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {

  @Input() data;

  imgSrc: string;

  constructor() { }

  ngOnInit() {
   this.setImgSrc();
  }

  setImgSrc() {
    const src = `assets/product-mind/article/${this.data.id}.png`;
    this.imgSrc = src;
  }

}
