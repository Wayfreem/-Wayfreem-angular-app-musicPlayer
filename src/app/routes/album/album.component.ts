import {Component, OnInit} from '@angular/core';
import {PlayStateService} from '../../service/states/play.state.service';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/http/http.service';
import {Album, Song} from '../../domain/play';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.less']
})
export class AlbumComponent implements OnInit {

  album: Album | {} = {songList: []};

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private playStateService: PlayStateService,
  ) {
  }

  ngOnInit() {
    // 获取当前播放列表Id
    const routeParams = this.route.snapshot.paramMap;
    const albumId = String(routeParams.get('albumId'));
    this.httpService.getOneAlbum(albumId).subscribe(body => {
      this.album = (body as Album[]).find((album) => {
        return album.id === albumId;
      });
      console.log(this.album);
    });
  }

  // 点击播放按钮
  play(data: Song) {
    this.playStateService.publish(this.playStateService.event_changeAlbum, this.album);
    this.playStateService.publish(this.playStateService.event_changePlay, data);
  }
}
