// 音频
export interface Song {
  id: string;
  name: string;
  url: string;
  album: {
    id: string,
    name: string
  };
  imgs?: string[];
}

// 课程
export interface Album {
  id: string;
  name: string;
  author?: string;
  img?: string;
  songList: Song[];
}
