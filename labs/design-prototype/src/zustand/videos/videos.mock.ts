//* @type Mock
//* @context Videos
//* @utility Adaptador que re-exporta los datos mock de videos para el store.

import type { Video } from "@/entities/video.entity";
import type { Channel } from "@/entities/channel.entity";
import {
  mockVideos,
  mockCategories,
  mockChannels,
  getVideoById as _getVideoById,
  getRelatedVideos as _getRelatedVideos,
  searchVideos as _searchVideos,
} from "@/data/mockData";

export const videosMock: Video[] = mockVideos;
export const categoriesMock: string[] = mockCategories;
export const channelsMock: Channel[] = mockChannels;

export const findVideoById = _getVideoById;
export const findRelatedVideos = _getRelatedVideos;
export const findVideosByQuery = _searchVideos;
