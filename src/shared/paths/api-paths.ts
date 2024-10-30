export const apiPaths = {
  auth: {
    signUp: "/auth/signup",
    signIn: "/auth/signin",
    refreshToken: "/auth/refresh-token",
    geoRange: (lat: number, lng: number) => `/auth/geo-range/${lat}/${lng}`,
    roomKey: (hsUserId: string) => `/auth/roomKey/${hsUserId}`
  },
  user: "/user",
  userSettings: (userId: string) => `/user-settings/${userId}`,
}
