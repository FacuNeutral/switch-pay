import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { Resend } from 'resend';
import envs from 'src/_common/config/envs/env-var.plugin';
import { TemplateEmail } from './interfaces/email.interface';

@Injectable()
export class EmailSenderService {

    private readonly logger = new Logger(EmailSenderService.name);

    private resend: Resend;

    constructor() {
        this.resend = new Resend(envs.RESEND_API_KEY);
    }


    async sendCodeToResetPassword(to: string, firstName: string, lastName: string, code: string) {
        const html = this.renderTemplate(TemplateEmail.ResetYourPassword, {
            firstName,
            lastName,
            code
        });
        const emailSending = await this.sendEmail(to, 'Reset Your Password', html);

        return emailSending;
    }

    async sendCodeToResetPincode(to: string, firstName: string, lastName: string, code: string) {
        const html = this.renderTemplate(TemplateEmail.ResetYourPincode, {
            firstName,
            lastName,
            code
        });
        const emailSending = await this.sendEmail(to, 'Recovery Pin Code', html);

        return emailSending;
    }

    async sendEmail(to: string, subject: string = "Team Switch Pay", html: string) {
        const emailSending = await this.resend.emails.send({
            from: envs.RESEND_DOMAIN_EMAIL,
            to,
            subject,
            html,
        });

        return emailSending;
    }

    private renderTemplate(templateName: TemplateEmail, context: Record<string, string>): string {
        const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
        const source = fs.readFileSync(templatePath, 'utf-8');
        const template = Handlebars.compile(source);
        return template(context);
    }

}
