import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {Song} from '../../domain/play';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.less'],
})
export class SongComponent implements OnInit {

  title: string;
  song: Song = {id: '', name: '暂无音频', url: '', album: {id: '', name: '暂无课程'}};

  constructor(
              private httpService: HttpService,
              private route: ActivatedRoute) {
    // 获取当前播放歌曲
    const routeParams = this.route.snapshot.paramMap;
    const songId = String(routeParams.get('songId'));
    this.httpService.getOneSong(songId).subscribe(body => {
      this.song = (body as Song[]).find((song) => {
        return song.id === songId;
      });
      console.log(this.song);
    });
  }

  ngOnInit() {

  }
}
