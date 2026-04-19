//* @type Store
//* @context Videos
//* @utility Estado central del catálogo de videos: filtrado, reproducción, búsqueda e interacciones.

import { create } from "zustand";
import type { Video } from "@/entities/video.entity";
import type { Channel } from "@/entities/channel.entity";
import {
  videosMock,
  categoriesMock,
  channelsMock,
  findVideoById,
  findRelatedVideos,
  findVideosByQuery,
} from "./videos.mock";

interface VideosState {
  // Data
  videos: Video[];
  categories: string[];
  channels: Channel[];

  // Filtrado por categoría
  activeCategory: string;
  filteredVideos: Video[];
  isLoadingCategory: boolean;
  setActiveCategory: (category: string) => void;

  // Video actual (Watch)
  currentVideo: Video | null;
  relatedVideos: Video[];
  setCurrentVideo: (id: string) => void;

  // Búsqueda
  searchQuery: string;
  searchResults: Video[];
  setSearchQuery: (query: string) => void;
  executeSearch: (query: string) => void;

  // Interacciones de usuario
  likedVideoIds: string[];
  subscribedChannels: string[];
  toggleLike: (videoId: string) => void;
  isVideoLiked: (videoId: string) => boolean;
  toggleSubscription: (channelName: string) => void;
  isSubscribed: (channelName: string) => boolean;
}

export const useVideosStore = create<VideosState>((set, get) => ({
  // Data inicial desde mocks
  videos: videosMock,
  categories: categoriesMock,
  channels: channelsMock,

  // Filtrado
  activeCategory: "Todos",
  filteredVideos: videosMock,
  isLoadingCategory: false,

  //* Filtra videos por categoría con delay simulado de carga.
  setActiveCategory: (category: string) => {
    set({ activeCategory: category, isLoadingCategory: true });

    setTimeout(() => {
      const { videos } = get();
      const filtered =
        category === "Todos"
          ? videos
          : videos.filter((v) => v.category === category);
      set({ filteredVideos: filtered, isLoadingCategory: false });
    }, 800);
  },

  // Video actual
  currentVideo: null,
  relatedVideos: [],

  //* Establece el video actual y calcula los relacionados.
  setCurrentVideo: (id: string) => {
    const video = findVideoById(id) ?? null;
    const related = video ? findRelatedVideos(id) : [];
    set({ currentVideo: video, relatedVideos: related });
  },

  // Búsqueda
  searchQuery: "",
  searchResults: [],

  //* Actualiza el texto de búsqueda sin ejecutarla.
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  //* Ejecuta la búsqueda y almacena resultados.
  executeSearch: (query: string) => {
    const results = findVideosByQuery(query);
    set({ searchQuery: query, searchResults: results });
  },

  // Interacciones
  likedVideoIds: [],
  subscribedChannels: [],

  //* Alterna like en un video.
  toggleLike: (videoId: string) => {
    const { likedVideoIds } = get();
    const exists = likedVideoIds.includes(videoId);
    set({
      likedVideoIds: exists
        ? likedVideoIds.filter((id) => id !== videoId)
        : [...likedVideoIds, videoId],
    });
  },

  //* Verifica si un video tiene like.
  isVideoLiked: (videoId: string) => {
    return get().likedVideoIds.includes(videoId);
  },

  //* Alterna suscripción a un canal.
  toggleSubscription: (channelName: string) => {
    const { subscribedChannels } = get();
    const exists = subscribedChannels.includes(channelName);
    set({
      subscribedChannels: exists
        ? subscribedChannels.filter((n) => n !== channelName)
        : [...subscribedChannels, channelName],
    });
  },

  //* Verifica si está suscrito a un canal.
  isSubscribed: (channelName: string) => {
    return get().subscribedChannels.includes(channelName);
  },
}));
