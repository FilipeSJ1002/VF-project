export declare class EmailService {
    private transporter;
    sendWelcomeEmail(email: string, name: string): Promise<void>;
    sendResetPasswordEmail(email: string, name: string): Promise<void>;
    sendNewPasswordEmail(email: string, name: string, newPassword: string): Promise<void>;
}
