export const AUTO = "auto";
export const LIGHT = "light";
export const DARK = "dark";
export const CHANGE = "change";

const _prefers_color_scheme = "prefers-color-scheme";
export const PREFERS_COLOR_SCHEME_DARK = `(${_prefers_color_scheme}: ${DARK})`;
export const PREFERS_COLOR_SCHEME_LIGHT = `(${_prefers_color_scheme}: ${LIGHT})`;
