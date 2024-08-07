import { use } from "react"
import { VerifyContext } from "../provider/verify-provider"

export const useVerify = () => {
  return use(VerifyContext)
}