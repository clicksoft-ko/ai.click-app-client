export const apiPaths = {
  auth: {
    signUp: "/api/auth/signup",
    signIn: "/api/auth/signin",
    refreshToken: "/api/auth/refresh-token",
    roomKey: (hsUserId: string) => `/api/auth/roomKey/${hsUserId}`
  },
  user: "/api/user",
}