export type User = {
    user : {
        name : string,
        email : string,
        email_verified: boolean
    },
    token : string
}

export type OTP = {
    code: string
}