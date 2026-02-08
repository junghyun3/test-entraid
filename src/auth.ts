import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

declare module "next-auth" {
  interface Session {
    //로그인하지 않은 상태에서는 session.user에 id나 roles가 없을 수 있음
    // Azure에서 App Role을 할당하지 않은 사용자는 roles가 없음
    // name, email, image도 Entra ID 설정에 따라 값이 없을 수 있음
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles?: string[];
    };
  }
}

// declare module "@auth/core/jwt" {
//   interface JWT {
//     roles?: string[];
//   }
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    jwt({ token, profile, user }) {
      // id 토큰에 사용자 ID 추가
      if (user?.id) {
        token.id = user.id;
      }
      // ID 토큰에서 roles claim을 JWT 토큰에 추가
      console.log("profile:", profile);
      if (profile?.roles) {
        token.roles = profile.roles as string[];
      }
      return token;
    },
    session({ session, token }) {
      // JWT 토큰의 id를 세션에 추가
      if (token.id) {
        session.user.id = token.id as string;
      }
      // JWT 토큰의 roles를 session에 추가
      if (token.roles) {
        session.user.roles = token.roles as string[];
      }
      return session;
    },
  },
  session: {
    maxAge: 30 * 60, // 30분 (초 단위)
    updateAge: 0
  },
  secret: process.env.AUTH_SECRET
});
