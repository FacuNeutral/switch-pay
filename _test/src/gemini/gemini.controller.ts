import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateGeminiDto } from './dto/create-gemini.dto';
import { UpdateGeminiDto } from './dto/update-gemini.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: any) {}

}
