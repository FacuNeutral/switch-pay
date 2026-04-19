import { IsString, IsUUID, IsOptional, IsIP, IsDate, Matches, MaxLength } from 'class-validator';
import { SessionSqlite } from '../entities/session.sqlite.entity';

export class SessionDto implements Pick<SessionSqlite, "id" | "userId" | "device" | "ip" | "createdAt" | "updatedAt"> {

    @IsOptional()
    @IsUUID()
    id: string;

    @IsUUID()
    userId: string;

    // @IsString()
    // @MaxLength(255, { message: "Token ID must be less than 255 characters" })
    // tokenId: string;

    @IsString()
    @MaxLength(100, { message: "Device must be less than 100 characters" })
    device: string;

    @IsIP()
    ip: string;

    @IsOptional()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt: Date;
}
