import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor, admin } from "better-auth/plugins";
import { prisma } from "../lib/prisma";
import { sendMail } from "../lib/mailer";
import VerificationEmail from "../emails/VerificationEmail";
import ResetSuccessEmail from "../emails/ResetSuccessEmail";
import ResetPasswordEmail from "../emails/ResetPasswordEmail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  basePath: "/auth",
  trustedOrigins: [process.env.NEXT_PUBLIC_URL!],
  appName: "Xtocore API",
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 5 * 60 },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "[Xtocore] Reset your password",
        react: ResetPasswordEmail({ name: user.name, url }),
      });
    },
    onPasswordReset: async ({ user }) => {
      await sendMail({
        to: user.email,
        subject: "[Xtocore] Password reset successful",
        react: ResetSuccessEmail({
          name: user.name,
          loginUrl: `${process.env.NEXT_PUBLIC_URL}/login`,
        }),
      });
    },
  }, // <-- correctly closes emailAndPassword
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "[Xtocore] Verify your email address",
        react: VerificationEmail({ name: user.name, url }),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      prompt: "select_account",
      redirectURI: `${process.env.BETTER_AUTH_URL}/auth/callback/google`,
    },
  },
  plugins: [admin(), twoFactor()],
});
