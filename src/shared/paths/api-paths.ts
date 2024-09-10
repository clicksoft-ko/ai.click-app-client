export const apiPaths = {
  auth: {
    signUp: "/auth/signup",
    signIn: "/auth/signin",
    refreshToken: "/auth/refresh-token",
    roomKey: (hsUserId: string) => `/auth/roomKey/${hsUserId}`
  },
  user: "/user",
}