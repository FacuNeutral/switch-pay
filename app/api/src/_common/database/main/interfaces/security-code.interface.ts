export enum UserAction {
    ResetPassword = 'RESET_PASSWORD',
    ResetPincode = 'RESET_PINCODE',
    VerifyEmail = 'VERIFY_EMAIL',
}

export interface RecoveryUserData {
    id: string;
    codeId: string;
    userAction: UserAction;
}