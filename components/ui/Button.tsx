import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
    ariaLabel?: string;
    hasBtnClass?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, Props>(({
  type = "button",
  class: _class = "",
  loading,
  disabled,
  ariaLabel,
  children,
  hasBtnClass = true,
  ...props
}, ref) => (
  <button
    {...props}
    className={`no-animation ${_class} ${hasBtnClass ? "btn" : ""}`}
    disabled={disabled || loading}
    aria-label={ariaLabel || props["aria-label"]}
    type={type}
    ref={ref}
  >
    {loading ? <span class="loading loading-spinner" /> : children}
  </button>
));

export default Button;
