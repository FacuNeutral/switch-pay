//* @type Entity
//* @context Shorts
//* @utility Modelo de dominio completo de un short.

export interface Short {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  thumbnail: string;
  views: string;
  likes: string;
  comments: string;
  timestamp: string;
}
