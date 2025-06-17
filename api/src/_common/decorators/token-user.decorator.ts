import { createParamDecorator, ExecutionContext } from "@nestjs/common";

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
/**
 * Custom parameter decorator used to obtain the `user_id` extracted from a token.
  * This decorator is applied in a controller to access the authenticated user.
*/

export const UserId = createParamDecorator<string>(
    (data: unknown, ctx: ExecutionContext) => {
        return ctx.switchToHttp().getRequest().user.id;


    });
export type UserId = string;