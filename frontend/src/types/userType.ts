export type User = {
    user : {
        name : string
        email : string
        email_verified: boolean
        type: "admin" | "customer"
    },
    token : string
}

export type OTP = {
    code: string
}