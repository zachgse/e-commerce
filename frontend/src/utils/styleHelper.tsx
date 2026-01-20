import clsx from "clsx"

export const statusBadgePills = (variant: "active" | "inactive" | "waiting_for_payment" | "order_placed" | "shipped" 
                            | "delivered" |  "pending" | "failed" | "success" | undefined) => {
    return clsx(
        "rounded-full text-white text-center capitalize md:px-2 px-4",
        (variant === "active" || variant == "delivered" || variant == "success") &&
            "bg-green-500 border-1 border-green-500",
        (variant === "inactive" || variant === "failed") && 
            "bg-red-500 border-1 border-red-500",
        (variant === "pending" || variant === "waiting_for_payment") && 
            "bg-yellow-500 border-1 border-yellow-500",
        variant === "order_placed" &&
            "bg-gray-500 border-1 border-gray-500",
        variant === "shipped" && 
            "bg-blue-500 border-1 border-blue-500",
        variant === undefined && ""
    )
}

export const otpMessage = (variant: "success" | "resent" | "failed" | undefined) => {
    return clsx(
        "border border-1 text-white text-center w-72 h-auto p-4",
        (variant === "success" || variant === "resent") && 
            "border-green-500 bg-green-400",
        variant === "failed" &&
            "border-red-500 bg-red-400",
        variant === undefined && ""
    )
}