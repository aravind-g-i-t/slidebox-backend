export const ROUTES = {
    SIGNUP: "/signup",
    AUTH: "/auth",
    SIGNIN: "/signin",
    VERIFY_OTP: "/otp", 
    IMAGES:"/images",
    UPLOAD:"/upload",
    LOGOUT:"/logout",
    REFRESH:"/refresh",
    REARRANGE:"/rearrange",
    TITLE:"/:imageId/title",
    FILE: "/:imageId/file",
    IMAGE:"/:imageId"
} as const

export type Routes = typeof ROUTES[keyof typeof ROUTES];