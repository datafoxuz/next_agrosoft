import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { baseUrl } from "@/data";
// Extend the Session type to include the token property

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        try {
          // Make a POST request to the login endpoint
          const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const user = await response.json();

          if (response.ok && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          // Handle any errors that occur during authentication
          throw new Error("Authentication failed.");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      return { ...token, ...user };
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: any;
      user: User;
    }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error", // Modify this with your own error page path
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
