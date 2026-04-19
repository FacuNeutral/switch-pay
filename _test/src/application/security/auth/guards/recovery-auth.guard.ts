
import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '@db/dtos/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class RecoveryTokenAuthGuard extends AuthGuard(["RECOVERY_TOKEN_STRATEGY"]) { }

