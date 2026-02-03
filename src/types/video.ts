export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  type: 'youtube' | 'local';
}
