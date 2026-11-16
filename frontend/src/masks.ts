import { useMask } from "@react-input/mask"

export function usePhoneMask() {
  return useMask({
    mask: "(__) _ ____-____",
    replacement: {
      _: /\d/
    }
  })
} 