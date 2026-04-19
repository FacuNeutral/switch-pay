//* @type Mock
//* @context Shorts
//* @utility Adaptador que re-exporta los datos mock de shorts para el store.

import type { Short } from "@/entities/short.entity";
import {
  mockShorts,
  getShortById as _getShortById,
} from "@/data/mockData";

export const shortsMock: Short[] = mockShorts;

export const findShortById = _getShortById;
