//* @type Entity
//* @context Videos
//* @utility Modelo de dominio completo de un canal.

export interface Channel {
  name: string;
  avatar: string;
  hasNotification: boolean;
}
