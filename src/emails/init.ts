import { EmailRegistry } from '@/lib/email/email-registry';
import InviteUserEmail from './invite-user';
import ResetPasswordEmail from './reset-password';
import VerifyEmailEmail from './verify-email';

/**
 * Registers user-related email templates.
 */
export async function initEmails() {
  EmailRegistry.register('user:invite', InviteUserEmail);
  EmailRegistry.register('user:verify', VerifyEmailEmail);
  EmailRegistry.register('user:reset', ResetPasswordEmail);
}
