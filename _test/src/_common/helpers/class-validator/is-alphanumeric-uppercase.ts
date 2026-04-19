import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsAlphanumericUppercase(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isAlphanumericUppercase",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === "string" && /^[A-Z0-9]+$/.test(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must contain only uppercase letters and numbers`;
                }
            }
        });
    };
}
