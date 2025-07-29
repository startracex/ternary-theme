import { CHANGE, DARK, LIGHT, PREFERS_COLOR_SCHEME_DARK } from "./constant.ts";
import type { BinaryTheme } from "./types.ts";

type ChangeCallback = (this: MediaQueryList, ev: MediaQueryListEvent) => any;

export function autoScheme(): {
  query: MediaQueryList;
  watch: (callback: ChangeCallback) => () => void;
  resolved: BinaryTheme;
} {
  const query = matchMedia(PREFERS_COLOR_SCHEME_DARK);
  return {
    query,
    watch: (callback) => {
      query.addEventListener(CHANGE, callback);
      return () => query.removeEventListener(CHANGE, callback);
    },
    resolved: query.matches ? DARK : LIGHT,
  };
}
