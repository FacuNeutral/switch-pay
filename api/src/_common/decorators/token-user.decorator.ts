import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RecoveryUserData, UserAction } from "@db/interfaces/security-code.interface";

/**
 * Custom parameter decorator used to obtain the user extracted from a token.
 * This decorator is applied in a controller to access the authenticated user.
 */
export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.user as object;
    }
);

export const RecoveryUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.user as RecoveryUserData;
    }
);

/**
 * Custom parameter decorator used to obtain the `user_id` extracted from a token.
  * This decorator is applied in a controller to access the authenticated user.
*/
export const UserId = createParamDecorator<string>(
    (data: unknown, ctx: ExecutionContext) => {
        return ctx.switchToHttp().getRequest().user.id;


    });

export const UserEmail = createParamDecorator<string>(
    (data: unknown, ctx: ExecutionContext) => {
        return ctx.switchToHttp().getRequest().user.email;

    });

export const TokenId = createParamDecorator<string>(
    (data: unknown, ctx: ExecutionContext) => {
        return ctx.switchToHttp().getRequest().user.tokenId;
    }
);
