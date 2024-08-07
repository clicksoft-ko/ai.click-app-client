import { use } from "react"
import { RadioGroupContext } from "../provider"

export const useRadioGroup = () => {
  return use(RadioGroupContext);
}