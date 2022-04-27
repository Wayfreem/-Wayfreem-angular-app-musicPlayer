import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayStateService {

  subjects = {};

  // 切换课程
  public event_changeAlbum = 'event:changeAlbum';

  // 切换播放单曲
  public event_changePlay = 'event:changePlay';

  // 时长改变
  public event_playing = 'event:playing';

  // 进度改变
  public event_changePlayProgress = 'event:changePlayProgress';

  // 设置播放速率
  public event_changePlayRate = 'event:changePlayRate' ;

  // 暂停
  public event_off = 'event:form.load';

  // 开始
  public event_on = 'event:on';

  // 播放结束
  public event_end = 'event:end';

  subscribe(topic: string, ...handlers: Function[]): void {
    this.getSubject(topic).subscribe(data => {
      handlers.forEach((handler) => {
        handler(data);
      });
    });
  }

  publish(topic: string, data: any): void {
    this.getSubject(topic).next(data);
  }

  getSubject(topic: string): Subject<any> {
    let subject = this.subjects[topic];
    if (subject === undefined) {
      subject = new Subject();
      this.subjects[topic] = subject;
    }
    return subject;
  }
}
