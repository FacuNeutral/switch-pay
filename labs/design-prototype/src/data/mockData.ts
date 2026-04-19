//* @type Data
//* @context Global
//* @utility Datasets base y generadores genéricos de videos, canales y shorts.

import type { Video } from "@/entities/video.entity";
import type { Channel } from "@/entities/channel.entity";
import type { Short } from "@/entities/short.entity";

export type { Video, Channel, Short };

const THUMBNAIL_BASE = "https://picsum.photos/seed";

const channelNames = [
  "CodeCraft", "DevPulse", "StackOvercast", "Pixel & Byte",
  "The Commit Log", "NullPointer", "SyntaxFM", "ByteSize",
  "Debug Dreams", "Open Source Radio", "Terminal Talks", "ShipIt Studio",
];

const titles = [
  "Rust vs Go en 2026: La batalla definitiva",
  "Construí un SaaS completo en un fin de semana 🚀",
  "Por qué dejé de usar Redux (y qué uso ahora)",
  "Arquitectura hexagonal explicada en 20 minutos",
  "Mi setup de terminal minimalista para productividad",
  "10 horas de lofi beats para programar 🎧",
  "¿Vale la pena aprender Zig en 2026?",
  "Chill Code Session — Refactorizando un monolito",
  "El error de deploy que me costó 3 días 😅",
  "IA generativa para devs: guía práctica sin humo",
  "Sonidos de lluvia + teclado mecánico para concentrarte",
  "Hice pair programming con una IA durante 48h",
  "Patrones de diseño que realmente uso en producción",
  "Los mejores frameworks frontend de 2026",
  "Tutorial completo de TypeScript avanzado",
  "Cómo pasé de junior a senior en 2 años",
  "Encontramos un memory leak en producción",
  "¿Microservicios o monolito? La respuesta real",
  "Deep dive en el event loop de Node.js",
  "Podcast: El futuro del desarrollo web",
];

const categories = [
  "Todos", "Programación", "DevOps", "Podcasts",
  "Tutoriales", "Live Coding", "Noticias Tech",
  "Inteligencia artificial", "Frontend", "Backend",
];

const durations = [
  "3:06:56", "2:35:59", "16:20", "1:43:50", "3:44:50",
  "10:00:00", "10:14", "54:19", "5:24:08", "4:03:43",
  "2:00:54", "54:30", "28:04", "55:04", "18:23",
  "12:45", "45:30", "1:22:10", "33:15", "8:42",
];

const viewCounts = [
  "78K vistas", "313K vistas", "8.3M de vistas", "4.4M de vistas",
  "705K vistas", "1.8M de vistas", "30K vistas", "13K vistas",
  "511K vistas", "357K vistas", "184K vistas", "189K vistas",
  "280K vistas", "549K vistas", "1.4M de vistas", "96K vistas",
  "1.2M de vistas", "461K vistas", "644K vistas", "115 vistas",
];

const timeAgo = [
  "hace 17 horas", "hace 8 días", "hace 5 años", "hace 1 mes",
  "hace 2 semanas", "hace 7 años", "hace 6 meses", "hace 1 año",
  "hace 7 días", "hace 13 días", "hace 2 meses", "hace 3 años",
  "hace 4 días", "hace 2 días", "hace 1 día", "hace 3 horas",
];

//* Genera un avatar de dicebear a partir de un seed.
function generateAvatar(seed: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=c62828,d32f2f,e53935,f44336,ef5350`;
}

//* Genera un array de videos mock con datos cíclicos.
export function generateVideos(count: number = 20): Video[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `video-${i + 1}`,
    title: titles[i % titles.length],
    channel: channelNames[i % channelNames.length],
    channelAvatar: generateAvatar(channelNames[i % channelNames.length]),
    thumbnail: `${THUMBNAIL_BASE}/video${i + 1}/640/360`,
    views: viewCounts[i % viewCounts.length],
    timestamp: timeAgo[i % timeAgo.length],
    duration: durations[i % durations.length],
    description: "Este es un video de ejemplo con contenido simulado para la plataforma. Disfruta del contenido y no olvides suscribirte al canal para más videos como este.",
    likes: `${Math.floor(Math.random() * 10)}K`,
    subscribers: `${(Math.random() * 5).toFixed(1)}M de suscriptores`,
    category: categories[Math.floor(Math.random() * categories.length)],
  }));
}

export const mockVideos = generateVideos(24);

export const mockChannels: Channel[] = channelNames.slice(0, 8).map((name) => ({
  name,
  avatar: generateAvatar(name),
  hasNotification: Math.random() > 0.3,
}));

export const mockCategories = categories;

const shortTitles = [
  "Este atajo de VS Code cambia todo 🤯",
  "POV: Tu PR pasa CI a la primera",
  "Truco de git que nadie te enseñó",
  "Regex en 30 segundos",
  "¿CSS o magia negra? 👀",
  "Cuando el linter tiene razón y vos no",
  "El comando de terminal que necesitabas",
  "Refactor speedrun en 45 segundos",
  "Mi primer deploy a producción",
  "Encontré un bug con console.log 😅",
  "Tip rápido de TypeScript",
  "Docker explicado en un short 🐳",
];

//* Genera un array de shorts mock con datos cíclicos.
export function generateShorts(count: number = 12): Short[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `short-${i + 1}`,
    title: shortTitles[i % shortTitles.length],
    channel: channelNames[i % channelNames.length],
    channelAvatar: generateAvatar(channelNames[i % channelNames.length]),
    thumbnail: `${THUMBNAIL_BASE}/short${i + 1}/360/640`,
    views: viewCounts[i % viewCounts.length],
    likes: `${Math.floor(Math.random() * 50 + 1)}K`,
    comments: `${Math.floor(Math.random() * 500 + 10)}`,
    timestamp: timeAgo[i % timeAgo.length],
  }));
}

export const mockShorts = generateShorts(12);

//* Busca un short por su id.
export function getShortById(id: string): Short | undefined {
  return mockShorts.find((s) => s.id === id);
}

//* Busca un video por su id.
export function getVideoById(id: string): Video | undefined {
  return mockVideos.find((v) => v.id === id);
}

//* Devuelve videos excluyendo el actual (relacionados).
export function getRelatedVideos(currentId: string): Video[] {
  return mockVideos.filter((v) => v.id !== currentId).slice(0, 10);
}

//* Filtra videos por título o canal según el query.
export function searchVideos(query: string): Video[] {
  const q = query.toLowerCase();
  return mockVideos.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q)
  );
}
