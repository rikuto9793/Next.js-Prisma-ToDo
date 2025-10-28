// lib/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

const allowed = (process.env.ALLOWED_EMAILS ?? "")
.split(",")
.map(e => e.trim().toLowerCase())
.filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
adapter: PrismaAdapter(prisma),
providers: [
GitHub({
clientId: process.env.GITHUB_ID!,
clientSecret: process.env.GITHUB_SECRET!,
}),
],
callbacks: {
async signIn({ user }) {
if (!user?.email) return false;
return allowed.includes(user.email.toLowerCase());
},
},
session: { strategy: "database" },
});