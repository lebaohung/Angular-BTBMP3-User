export interface Song {
  id: number;
  name: string;
  category_id: number;
  user_id: number;
  likes: number;
  views: number;
  creat_date: string;
  song_image: string;
  status: number;
  description?: string;
  song_link: string;
  song_author: string;
}
