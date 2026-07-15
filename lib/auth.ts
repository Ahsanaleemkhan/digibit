import NextAuth, { type NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const adminsFile = path.join(process.cwd(), "data", "admins.json");

function readAdmins() {
  try {
    return JSON.parse(fs.readFileSync(adminsFile, "utf-8"));
  } catch {
    return [];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admins = readAdmins();
        const admin = admins.find(
          (a: { email: string }) => a.email === credentials.email
        );

        if (!admin) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          admin.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role || "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};

export function auth() {
  return getServerSession(authOptions);
}

export const authHandler = NextAuth(authOptions);
