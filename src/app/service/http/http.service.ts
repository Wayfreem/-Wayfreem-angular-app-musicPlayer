import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient){

  }

  // 获取某一个数据
  getOneAlbum(albumId: string): Observable<object> {
    return this.httpClient.get('assets/product-mind/mock-album.json');
  }

  // 获取当前专辑下的所有播放列表
  getAllAlbum(data): Observable<object> {
    return this.httpClient.get('assets/product-mind/mock-album.json', data);
  }



  // 获取某一个数据
  getOneSong(songId: string): Observable<object> {
    return this.httpClient.get('assets/product-mind/mock-song.json');
  }
}
