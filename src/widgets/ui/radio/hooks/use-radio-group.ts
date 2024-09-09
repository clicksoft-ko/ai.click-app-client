import { useContext } from "react"
import { RadioGroupContext } from "../provider"

export const useRadioGroup = () => {
  return useContext(RadioGroupContext);
}