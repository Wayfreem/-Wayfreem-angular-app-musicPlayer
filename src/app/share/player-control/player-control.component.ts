import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlayStateService} from '../../service/states/play.state.service';
import {NzDrawerService} from 'ng-zorro-antd';
import {PlayListComponent} from '../play-list/play-list.component';
import {Album} from '../../domain/play';


@Component({
  selector: 'app-player-control',
  templateUrl: './player-control.component.html',
  styleUrls: ['./player-control.component.less']
})

export class PlayerControlComponent implements OnInit {

  @ViewChild('progressBarElement', {static: false}) progressBarElement: ElementRef;
  @ViewChild('progressBarLoad', {static: false}) progressBarLoadElement: ElementRef;

  album: Album = {id: '', name: '暂无课程', songList: []}; // 当前课程
  currentPlay = {id: '', name: '暂无音频', url: ''}; // 当前播放
  currentPlayRate = '1.0x 倍数';
  playTimes = [{id: 1, name: '1.0x 倍数'}, {id: 1.2, name: '1.2x 倍数'}, {id: 1.5, name: '1.5x 倍数'}, {id: 2.0, name: '2.0x 倍数'}];

  startTime = '00:00';
  endTime = '00:00';
  isPlaying = false;

  constructor(
    private playStateService: PlayStateService,
    private drawerService: NzDrawerService,
  ) {
  }

  ngOnInit() {
    //  变更课程
    this.playStateService.subscribe(this.playStateService.event_changeAlbum, (data) => {
      this.album = data;
    });

    // 变更进度条(监听音频播放)
    this.playStateService.subscribe(this.playStateService.event_playing, (data) => {
      if (this.progressBarElement) {
        const progressBar = this.progressBarElement.nativeElement;
        this.startTime = this.conversion(data.currentTime);
        this.endTime = this.conversion(data.endTime);
        if (data.endTime !== 0) {
          progressBar.style.width = data.currentTime / data.endTime.toFixed(3) * 100 + '%';
        } else {
          progressBar.style.width = '0%';
        }
      }

      if (this.progressBarLoadElement) {
        const progressBarLoad = this.progressBarLoadElement.nativeElement;
        const timeRanges = data.buffered; // 获取已缓冲部分的 TimeRanges 对象
        if (timeRanges && timeRanges.length > 0) {
          const timeBuffered = timeRanges.end(timeRanges.length - 1); // 获取以缓存的时间
          const bufferPercent = timeBuffered / data.endTime; // 获取缓存进度，值为0到1
          // @ts-ignore
          progressBarLoad.style.width = bufferPercent.toFixed(3) * 100 + '%';
        }
      }
    });

    // 监听播放改变
    this.playStateService.subscribe(this.playStateService.event_changePlay, (data) => {
      this.isPlaying = true;
      this.currentPlay = data;
    });

    // 监听播放结束
    this.playStateService.subscribe(this.playStateService.event_end, () => {
      this.isPlaying = false;
      this.next();
    });
  }


  /**
   * 设置播放的速度
   * @param rate 倍速
   */
  playbackRate(rate) {
    this.currentPlayRate = rate.name;
    this.playStateService.publish(this.playStateService.event_changePlayRate, rate.id);
  }

  play() {
    this.playStateService.publish(this.playStateService.event_on, null);
  }

  pause() {
    this.isPlaying = false;
    this.playStateService.publish(this.playStateService.event_off, null);
  }


  prev() {
    if (!this.album) {
      return;
    }
    const index = this.album.songList.findIndex((song) => {
      return song.id === this.currentPlayRate;
    });
    // 判断前面是否还有数据
    if (index > 0) {
      this.playStateService.publish(this.playStateService.event_changePlay, this.album.songList[index - 1]);
    }
  }

  next() {
    if (!this.album) {
      return;
    }
    const index = this.album.songList.findIndex((song) => {
      return song.id === this.currentPlayRate;
    });
    // 判断后面是否还有数据
    if (index < (this.album.songList.length - 1)) {
      this.playStateService.publish(this.playStateService.event_changePlay, this.album.songList[index + 1]);
    }
  }


  /**
   * 进度条点击事件
   * @param event 点击事件
   */
  progressClick(event) {
    if (!this.currentPlay.url) {
      return;
    }
    const progressBar = this.progressBarElement.nativeElement;

    const coordStart = progressBar.parentNode.getBoundingClientRect().left;
    const coordEnd = event.pageX;

    const p = (coordEnd - coordStart) / progressBar.parentNode.offsetWidth;
    // @ts-ignore
    progressBar.style.width = p.toFixed(3) * 100 + '%';

    this.playStateService.publish(this.playStateService.event_changePlayProgress, p);
  }

  showPlayList() {
    console.log(this.album.songList);
    const data = this.album && this.album.songList ? this.album.songList : [];
    const drawerRef = this.drawerService.create<PlayListComponent, { data: any }, object>({
      nzTitle: '播放列表',
      nzContent: PlayListComponent,
      nzContentParams: {data}
    });
    drawerRef.nzPlacement = 'bottom';
    drawerRef.nzHeight = 400;

    drawerRef.afterOpen.subscribe(() => {
    });
    drawerRef.afterClose.subscribe(data => {
      if (data) {
        this.playStateService.publish(this.playStateService.event_changePlay, data);
      }
    });
  }

  showArticle(){

  }

  conversion(value) {
    let minute: string | number = Math.floor(value / 60);
    minute = minute.toString().length === 1 ? ('0' + minute) : minute;
    let second: string | number = Math.round(value % 60);
    second = second.toString().length === 1 ? ('0' + second) : second;
    return `${minute}:${second}`;
  }
}
