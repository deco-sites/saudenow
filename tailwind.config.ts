import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        "primary-linear-gradient": "rgba(0, 183, 201, 1)",
        "secondary-linear-gradient": "rgba(0, 248, 194, 1)",
        "third-linear-gradient": "rgba(196, 94, 255, 1)",
        "soft-violet": "#C45EFF",
        "lemon": "#00F8C2",
      },
    },
  },
};
