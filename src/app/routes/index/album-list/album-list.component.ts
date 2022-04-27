import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Album} from '../../../domain/play';
import {HttpService} from '../../../service/http/http.service';


@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumListComponent implements OnInit {

  private page = -1;
  private size = 10;
  isLoading = false;
  data = [];
  albumList: Album[] = [];

  constructor(
    private router: Router,
    private http: HttpService
  ) {
    this.getData((res: any) => {
      this.albumList = res;
      this.data = res;
      this.isLoading = false;
    });
  }

  // 跳转
  itemClick(item, index) {
    this.router.navigate(['album', item.id]);
  }


  ngOnInit(): void {

  }



  getData(callback: (res: any) => void): void {
    this.isLoading = true;
    this.http.getAllAlbum({
      size: this.size,
      page: this.page++
    }).subscribe((res: any) => callback(res));
  }

  onLoading(): void {
    this.isLoading = true;
    this.data = this.data.concat([...Array(this.size)].fill({}).map(() => ({loading: true, name: {}})));
    this.http.getAllAlbum({
      size: this.size,
      page: this.page++
    }).subscribe((res: any) => {
      this.data = this.data.concat(res);
      this.albumList = [...this.data];
      this.isLoading = false;
    });
  }


  // 触底加载
}
