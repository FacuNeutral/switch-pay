import { JwtService } from "@nestjs/jwt";

export const createJwtService = (providerName: string, secret: string, expiresIn: string) => {
    return {
        provide: providerName,
        useFactory: () => {
            return new JwtService({
                secret,
                signOptions: { expiresIn }
            });
        },
    }
};