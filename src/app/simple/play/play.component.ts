import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {NzDrawerService} from 'ng-zorro-antd';
import {ListComponent} from './list/list.component';
import {ArticleComponent} from './article/article.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PlayStateService} from '../../service/states/play.state.service';
import {Player} from '../../domain/play';
import {Router} from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.less'],
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
export class PlayComponent implements OnInit {

  // todo 测试使用
  data = {
    id: '',
    name: '',
    author: '',
    title: '',
    imageUrl: '',
    isPlay: false
  };

  private audio;
  @ViewChild('audioElement', {static: false}) audioElement: ElementRef;
  @ViewChild('progressBarElement', {static: false}) progressBarElement: ElementRef;
  @ViewChild('progressBarLoad', {static: false}) progressBarLoadElement: ElementRef;

  title: string;

  isPlay = true;
  mockData: any;
  currentPlayData: any;
  currentIndex: number;

  startTime = '00:00';
  endTime = '00:00';

  currentPlayRate = '1.0x 倍数';
  playTimes = [{id: 1, name: '1.0x 倍数'}, {id: 1.2, name: '1.2x 倍数'}, {id: 1.5, name: '1.5x 倍数'}, {id: 2.0, name: '2.0x 倍数'}];

  constructor(public router: Router,
              private httpService: HttpService,
              private drawerService: NzDrawerService,
              private playService: PlayStateService) {
    this.httpService.getMockData().subscribe(body => {
      this.mockData = body;
    });

    this.playService.getPlay().subscribe((data) => {
      if (!data) {
        this.data.isPlay = false;
      }
      // console.log('play.component.html, get play', data);
    });

    this.playService.playData.subscribe((data: Player) => {
      if (data) {
        this.data = data;
      }
      // console.log('play.component.html, playData', data);
    });
  }

  ngOnInit() {
  }

  goBack(): void {
      this.router.navigate(['/index']);
      this.data.isPlay = false;
  }

  ngAfterViewInit(): void {
    this.audio = this.audioElement.nativeElement;

    this.audio.onloadedmetadata = () => {
      this.startTime = this.conversion(this.audio.currentTime);
      this.endTime = this.conversion(this.audio.duration);
    };

    setInterval(() => {
      if (this.progressBarElement) {
        const progressBar = this.progressBarElement.nativeElement;
        this.startTime = this.conversion(this.audio.currentTime);
        progressBar.style.width = this.audio.currentTime / this.audio.duration.toFixed(3) * 100 + '%';
      }

      if (this.progressBarLoadElement) {
        const progressBarLoad = this.progressBarLoadElement.nativeElement;
        const timeRanges = this.audio.buffered; // 获取已缓冲部分的 TimeRanges 对象
        if (timeRanges.length > 0) {
          const timeBuffered = timeRanges.end(timeRanges.length - 1); // 获取以缓存的时间
          const bufferPercent = timeBuffered / this.audio.duration; // 获取缓存进度，值为0到1
          // @ts-ignore
          progressBarLoad.style.width = bufferPercent.toFixed(3) * 100 + '%';
        }
      }
    }, 1000);
  }

  showList() {
    const data = {playList: this.mockData};
    const drawerRef = this.drawerService.create<ListComponent, { data: any }, object>({
      nzTitle: '播放列表',
      nzContent: ListComponent,
      nzContentParams: {data}
    });
    drawerRef.nzPlacement = 'bottom';
    drawerRef.nzHeight = 400;

    drawerRef.afterOpen.subscribe(() => {
    });
    // tslint:disable-next-line:no-shadowed-variable
    drawerRef.afterClose.subscribe(data => {
      if (data) {
        this.setAudioSrc(data);
      }
    });
  }

  setAudioSrc(data) {
    if (!data) {
      return;
    }
    this.currentPlayData = data.playData;
    this.currentIndex = data.index;
    const src = `assets/product-mind/audio/${this.currentPlayData.id}.mp3`;
    this.title = this.currentPlayData.name;
    this.audio.src = src;
    this.play();
  }

  prev() {
    if (!this.currentIndex) {
      return;
    }
    const playData = {playData: this.mockData[--this.currentIndex], index: this.currentIndex};
    this.setAudioSrc(playData);
  }

  play() {
    if (!this.currentPlayData) {
      return;
    }
    this.isPlay = false;
    // 获取当前的播放倍数
    const tempPlayRate = this.playTimes.find(item => item.name === this.currentPlayRate);
    this.audio.playbackRate = tempPlayRate.id;
    this.audio.play();
  }

  pause() {
    this.isPlay = true;
    this.audio.pause();
  }

  next() {
    if (!this.currentIndex || this.currentIndex + 1 >= this.mockData.length) {
      return;
    }
    const playData = {playData: this.mockData[this.currentIndex++], index: this.currentIndex};
    this.setAudioSrc(playData);
  }

  read() {
    if ( !this.currentPlayData || !this.currentPlayData.id) {return;}
    const data = {data: this.currentPlayData};
    const drawerRef = this.drawerService.create<ArticleComponent, { data: any }, object>({
      nzTitle: '文章阅读',
      nzContent: ArticleComponent,
      nzContentParams: data
    });
    drawerRef.nzPlacement = 'right';
    drawerRef.nzWidth = '100%';

    drawerRef.afterOpen.subscribe(() => {
    });
    drawerRef.afterClose.subscribe(data => {
    });
  }

  /**
   * 设置播放的速度
   * @param rate 倍速
   */
  playbackRate(rate) {
    if (this.currentPlayData) {
      this.audio.playbackRate = rate.id;
    }
    this.currentPlayRate = rate.name;
  }

  /**
   * 进度条点击事件
   * @param event 点击事件
   */
  progressClick(event) {
    if (!this.audio.src) {return;}
    const progressBar = this.progressBarElement.nativeElement;

    const coordStart = progressBar.parentNode.getBoundingClientRect().left;
    const coordEnd = event.pageX;

    const p = (coordEnd - coordStart) / progressBar.parentNode.offsetWidth;
    // @ts-ignore
    progressBar.style.width = p.toFixed(3) * 100 + '%';

    this.audio.currentTime = p * this.audio.duration;
    this.play();
  }

  conversion(value) {
    let minute: string | number = Math.floor(value / 60);
    minute = minute.toString().length === 1 ? ('0' + minute) : minute;
    let second: string | number = Math.round(value % 60);
    second = second.toString().length === 1 ? ('0' + second) : second;
    return `${minute}:${second}`;
  }

  handlerPlayerList(b: boolean) {

  }

  handlerPlay() {

  }

  handlerVisible(b: boolean) {

  }
}
