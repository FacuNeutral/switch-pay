
import { AuthGuard } from '@nestjs/passport';
import { Injectable} from '@nestjs/common';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard(["refresh_token_strategy"]) { }
export class AccessTokenAuthGuard extends AuthGuard(["access_token_strategy"]) { }

export class UserAuthGuard extends AuthGuard(["access_token_strategy"]) { }