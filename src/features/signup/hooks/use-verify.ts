import { useContext } from "react"
import { VerifyContext } from "../provider/verify-provider"

export const useVerify = () => {
  return useContext(VerifyContext)
}