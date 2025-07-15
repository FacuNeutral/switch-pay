import { UserAction } from "@db/interfaces/security-code.interface";

export interface VerificationCodeData {
    userAction: UserAction;
    firstName: string;
    lastName: string;
    code: string;
}