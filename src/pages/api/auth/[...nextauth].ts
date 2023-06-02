import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = credentials as any;

          const response = await fetch(
            `https://agrosoft.uz/api/v1/site/site/auth/login`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                username,
                password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data) {
            return data;
          } else {
            return null;
          }
        } catch (error) {
          return Promise.resolve(null);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
