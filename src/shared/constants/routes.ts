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
    IMAGE:"/:imageId",
    RESEND_OTP:"/otp/resend",
    RESET_OTP:"/reset/otp",
    GOOGLE_SIGNIN:"/google",
    VERIFY_EMAIL:'/reset/email',
    RESET_PASSWORD:'/reset/password'
} as const

export type Routes = typeof ROUTES[keyof typeof ROUTES];