// suppress-error-response.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const SUPPRESS_ERROR_RESPONSE_KEY = 'suppressErrorResponse';

export const SuppressErrorResponse = () => SetMetadata(SUPPRESS_ERROR_RESPONSE_KEY, true);
