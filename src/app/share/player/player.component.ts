import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Song} from '../../domain/play';
import {PlayStateService} from '../../service/states/play.state.service';


@Component({
  selector: 'app-player',
  template: `
    <audio controls preload="auto" #audioElement hidden></audio>`
})

export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {

  currentPlay: Song = {url: null, id: null, name: '暂无播放数据', album: {id: null, name: '无'}};
  audio: HTMLAudioElement = null;
  currentPlayRate = 1;
  timer = null;

  @ViewChild('audioElement', {static: false}) audioElement: ElementRef;

  constructor(
    private playStateService: PlayStateService,
  ) {
  }

  ngOnInit() {
    // 监听切换播放
    this.playStateService.subscribe(this.playStateService.event_changePlay, (data) => {
      if (!data && data.url && data.url !== this.currentPlay.url) {
        return;
      }
      clearInterval(this.timer);
      this.currentPlay = data;
      const src = `assets/product-mind/audio/${this.currentPlay.id}.mp3`;
      this.audio.src = src;
      this.audio.play();
      this.playStateService.publish(this.playStateService.event_playing, {
        currentTime: 0,
        endTime: 0,
      });
    });

    // 监听暂停
    this.playStateService.subscribe(this.playStateService.event_off, (data) => {
      if (!this.currentPlay) {
        return;
      }
      this.audio.pause();
    });

    // 监听播放
    this.playStateService.subscribe(this.playStateService.event_on, (data) => {
      if (!this.currentPlay) {
        return;
      }
      this.audio.play();
    });

    // 监听速率变更
    this.playStateService.subscribe(this.playStateService.event_changePlayRate, (data) => {
      this.currentPlayRate = data;
      this.audio.playbackRate = data;
    });

    // 监听进度条变更
    this.playStateService.subscribe(this.playStateService.event_changePlayProgress, (data) => {
      this.audio.currentTime = data * this.audio.duration;
      this.audio.play();
    });
  }

  ngAfterViewInit(): void {
    this.audio = this.audioElement.nativeElement;

    // 传递当前播放时长
    this.audio.onloadedmetadata = () => {
      this.timer = setInterval(() => {
        this.playStateService.publish(this.playStateService.event_playing, {
          currentTime: this.audio.currentTime,
          endTime: this.audio.duration,
          buffered: this.audio.buffered
        });
      }, 1000);
    };

    // 播放结束获取下一个音频进行播放
    this.audio.onended = () => {
      this.playStateService.publish(this.playStateService.event_end, null);
    };
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
