import { Module } from '@nestjs/common';
// import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

@Module({
  controllers: [GeminiController],
  providers: [],
  exports: [], // Exporta el servicio para que pueda ser utilizado en otros módulos
})
export class GeminiModule {
  // constructor(private readonly geminiService: GeminiService) { }

  // async onModuleInit() {
  //   await this.geminiService.processJsonWithGemini("diarco");
  // }
}
