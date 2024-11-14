import { JSX } from "preact";

export function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      class="bg-white text-black placeholder:text-zinc-300 rounded-md w-full px-2 py-1.5 focus:outline-none"
    />
  );
}
