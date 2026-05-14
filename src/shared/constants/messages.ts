
export const MESSAGES = {

    SUCCESS: "Operation completed successfully",
    SAVED: "Saved successfully",
    UPDATED: "Updated successfully",
    DELETED: "Deleted successfully",
    NOT_FOUND: "Resource not found",
    SERVER_ERROR: "An unexpected error occurred",

    ROUTE_NOT_FOUND: "Route not found",

    USER_CREATED: "User created successfully",
    USER_NOT_CREATED: "Failed to create user",

    USER_EXISTS: "User already exists",

    INVALID_TOKEN: "Invalid or expired token",
    INVALID_REFRESH_TOKEN: "The refresh token is invalid or expired.",
    NO_REFRESH_TOKEN: "Refresh token is missing",
    REFRESH_TOKEN_SUCCESS: "Access token was updated successfully.",
    ACCESS_TOKEN_NOT_CREATED:"Failed to create access token.",
    REFRESH_TOKEN_NOT_CREATED:"Failed to create refresh token.",
    NO_SESSION: "No active session found",
    SESSION_EXPIRED: "Your session has expired. Please login again",

    OTP_SENT: "OTP has been sent successfully.",
    OTP_RESENT: "OTP has been resent successfully.",
    OTP_VERIFIED: "OTP verified successfully.",
    OTP_EXPIRED: "OTP has expired. Please request a new one.",
    INVALID_OTP: "The OTP entered is invalid.",
    OTP_NOT_SENT:"Otp not sent.",


    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logout successful.",
    USE_GOOGLE_SIGNIN_MESSAGE: "This account was created with Google. Please continue using Google Sign-In.",


    BLOCKED: "Your account has been blocked.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    
    SIGNUP_TIMEOUT: "Process time-out. Please signup again",
    NO_ACCOUNT: "No account found with this email",
    INCORRECT_PASSWORD: "Password is incorrect",
    ACCOUNT_CREATED_SUCCESS : "Your account has been created successfully. You can now log in.",
    SIGNUP_FAILED: "Signup failed",

    IMAGES_FETCHED:"Images fetched successfully",
    IMAGE_NOT_FOUND:"Image not found",
    IMAGE_NOT_UPDATED:"Image not updated",
    INVALID_TARGET_ORDER: "Invalid target order",
    IMAGES_REARRANGED: "Images rearranged successfully",
    UNAUTHORIZED: "You are not authorized to perform this action",
    IMAGE_UPDATED: "Image updated successfully",
    IMAGE_DELETED: "Image deleted successfully"

} as const;

export type Message = typeof MESSAGES[keyof typeof MESSAGES];
