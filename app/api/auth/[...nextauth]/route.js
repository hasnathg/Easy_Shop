import clientPromise from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" }, // simpler than DB sessions
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Runs on login submit
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) return null;

        const client = await clientPromise;
        const db = client.db("easy_shop");
        const user = await db.collection("users").findOne({ email });

        if (!user) return null;

        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;

        // Returned object becomes JWT `token` (and session.user)
        return {
          id: user._id.toString(),
          name: user.name || user.email,
          email: user.email,
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      // attach user id on first login
      if (user?.id) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.uid) session.user.id = token.uid;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };