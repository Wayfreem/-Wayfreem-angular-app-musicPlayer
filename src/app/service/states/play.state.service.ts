import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Player} from '../../domain/play';


@Injectable({
  providedIn: 'root'
})
export class PlayStateService {

  private play: Player;
  public playData = new Subject();

  constructor() {
  }

  public getPlay(): Observable<any> {
    const that = this;
    return Observable.create((observer) => observer.next(that.play));
  }

  public changePlay(data: Player) {
    this.play = data;
    this.playData.next(this.play);
  }


}
