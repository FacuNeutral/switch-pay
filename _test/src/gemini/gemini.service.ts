// // ✅ Cambios integrados directamente en GeminiService para validaciones de productos

// import {
//   Injectable,
//   InternalServerErrorException,
//   Logger,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { GoogleGenAI } from '@google/genai';
// import * as path from 'path';
// import * as fs from 'fs/promises';
// import { bestPricePromptDiarco } from '../_prompt/gemini/best_price/best_price_general.prompt';
// import { bestPriceInMaxiconsumo } from 'src/_prompt/gemini/best_price/best_price_maxiconsumo.prompt';
// import { jsonrepair } from 'jsonrepair';
// import * as pLimit from 'p-limit';

// @Injectable()
// export class GeminiService {
//   private readonly logger = new Logger(GeminiService.name);
//   private genAI: GoogleGenAI;
//   private modelName = 'gemini-2.5-pro';

//   constructor(private readonly configService: ConfigService) {
//     this.genAI = new GoogleGenAI({
//       apiKey: configService.get<string>('GEMINI_API_KEY'),
//     });
//   }

//   private cleanAndParseGeminiOutput(raw: string): any {
//     try {
//       const cleaned = raw.replace(/^```json/, '').replace(/```$/, '').trim();
//       const repaired = jsonrepair(cleaned);
//       return JSON.parse(repaired);
//     } catch (error) {
//       this.logger.error('❌ Error al parsear el JSON desde la respuesta de Gemini', error.stack);
//       throw new InternalServerErrorException('La respuesta de Gemini no es un JSON válido.');
//     }
//   }

//   buildPromptContextFromPage(page: any, strict = false): string {
//     const context = {
//       page_name: page.image ?? null,
//       key_elements: page.key_elements ?? [],
//       grouped_products: page.grouped_products ?? [],
//       ocr_blocks: page.ocr_blocks ?? [],
//       raw_text: page.text ?? '',
//     };

//     if (strict) {
//       (context as any).llm_instructions = `
// Eres un asistente experto en detección de precios.
// Debes:
// 1. NO incluir productos con más de dos precios en su grupo.
// 2. NO incluir productos con solo un cartel de descuento.
// 3. NO incluir productos que no tengan un precio claramente distinguible.
// 4. Validar que si hay pack xN, el price_per_unit se calcule correctamente.
// 5. Marcar como \"discarded\" productos dudosos.
// `;
//     }

//     return JSON.stringify(context, null, 2);
//   }

//   async generateTextStream(prompt: string): Promise<string> {
//     try {
//       this.logger.log(`🔁 Streaming texto para el prompt: "${prompt.substring(0, 30)}..."`);

//       const contents = [
//         {
//           role: 'user',
//           parts: [{ text: prompt }],
//         },
//       ];

//       const response = await this.genAI.models.generateContentStream({
//         model: this.modelName,
//         contents,
//         config: {
//           thinkingConfig: {
//             thinkingBudget: -1,
//           },
//           responseMimeType: 'text/plain',
//         },
//       });

//       let fullText = '';
//       for await (const chunk of response) {
//         this.logger.debug(`📥 Chunk recibido: ${chunk.text}`);
//         fullText += chunk.text;
//       }

//       return fullText;
//     } catch (error) {
//       this.logger.error('❌ Error al generar texto por streaming con Gemini', error.stack);
//       throw new InternalServerErrorException('Error en la API de Gemini con streaming.');
//     }
//   }

//   async processJsonInChunks(sourceName: string): Promise<void> {
//   const inputPath = path.join(process.cwd(), 'market_price_list', sourceName, 'result', 'ocr_output.json');
//   const outputPath = path.join(process.cwd(), 'list_price', 'month', 'july', `list_price_${sourceName}.json`);

//   try {
//     const fileContent = await fs.readFile(inputPath, 'utf-8');
//     const pages = JSON.parse(fileContent);

//     const combinedProducts: any[] = [];
//     const combinedDiscounts: any[] = [];

//     let wholesaler_name: string | null = null;
//     let date: string | null = null;
//     let currency: string | null = null;

//     const parsedPages = await Promise.all(
//       pages.map(async (page, index) => {
//         this.logger.log(`📄 Procesando página ${index + 1} (${page.image}) de ${pages.length}...`);
//         const visualContext = this.buildPromptContextFromPage(page, true);
//         const prompt = `${bestPricePromptDiarco}\n\n${visualContext}`;

//         const responseText = await this.generateTextStream(prompt);
//         const parsed = this.cleanAndParseGeminiOutput(responseText);

//         if (!parsed || !parsed.products) {
//           this.logger.warn(`⚠️ Gemini devolvió resultado incompleto en página ${index + 1} (${page.image})`);
//           return null;
//         }

//         return parsed;
//       })
//     );

//     for (const parsed of parsedPages) {
//       if (!parsed) continue;

//       if (!wholesaler_name && parsed.wholesaler_name) wholesaler_name = parsed.wholesaler_name;
//       if (!date && parsed.date) date = parsed.date;
//       if (!currency && parsed.currency) currency = parsed.currency;

//       // Agregamos todos los productos sin descartar ninguno
//       for (const product of parsed.products) {
//         combinedProducts.push(product);
//       }

//       // Ignoramos los productos descartados para que no se agreguen

//       if (Array.isArray(parsed.wholesaler_discounts)) {
//         combinedDiscounts.push(...parsed.wholesaler_discounts);
//       }
//     }

//     if (!wholesaler_name || !date || !currency) {
//       throw new Error("❌ Faltan campos principales inferidos por Gemini");
//     }

//     const result = {
//       wholesaler_name,
//       date,
//       currency,
//       products: combinedProducts,
//       discarded_products: [], // dejamos vacío
//       wholesaler_discounts: combinedDiscounts,
//     };

//     await fs.mkdir(path.dirname(outputPath), { recursive: true });
//     await fs.writeFile(outputPath, JSON.stringify(result, null, 2), 'utf-8');
//     this.logger.log(`✅ Resultado guardado en: ${outputPath}`);

//   } catch (error) {
//     this.logger.error('❌ Error al procesar JSON por páginas con IA', error.stack);
//     throw new InternalServerErrorException('Falló el procesamiento automático por páginas.');
//   }
// }

// }
