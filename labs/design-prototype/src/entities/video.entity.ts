//* @type Entity
//* @context Videos
//* @utility Modelo de dominio completo de un video.

export interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  thumbnail: string;
  views: string;
  timestamp: string;
  duration: string;
  description?: string;
  likes?: string;
  subscribers?: string;
  category?: string;
}
