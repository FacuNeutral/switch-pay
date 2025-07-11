import { UserAction } from "src/_common/database/interfaces/user-action.interface";

export interface VerificationCodeData {
    userAction: UserAction;
    firstName: string;
    lastName: string;
    code: string;
}