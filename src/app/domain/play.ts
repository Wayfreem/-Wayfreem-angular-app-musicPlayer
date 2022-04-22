export interface Player {
  id: string;
  name: string;
  author: string;
  title: string;
  imageUrl: string;
  isPlay: boolean;
}

export interface Article {
  id: string;
  name: string;
  url: string;
  content: string;
  isShow: boolean;
}
