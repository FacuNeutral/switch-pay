import { PickType } from "@nestjs/mapped-types";
import { IsAlpha, IsEnum, IsString, Length } from "class-validator";
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
import { IsAlphanumericUppercase } from "src/_common/helpers/class-validator/is-alphanumeric-uppercase";
import { Transform } from "class-transformer";


export class CodeDto {
    @IsString()
    @Length(6, 8, { message: 'only codes of 6 or 8 characters are allowed' })
    @IsAlpha()
    @Transform(({ value }) => value?.toUpperCase())
    code: string;
}