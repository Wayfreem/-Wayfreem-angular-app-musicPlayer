import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Article} from '../../domain/play';


@Injectable({
  providedIn: 'root'
})
export class ArticleStateService{

  private article: Article;
  public playData = new Subject();

  constructor() {}

  public showArticle(): Observable<any> {
    const that = this;
    return Observable.create((observer) => observer.next(that.article));
  }

  public hideArticle(data: Article) {
    this.article = data;
    this.playData.next(this.article);
  }
}
