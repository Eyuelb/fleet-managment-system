export const filterFieldProps = {
  size: "xs",
   className:" border-input hover:bg-accent-foreground",
//     "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground  text-xs h-8 gap-0 truncate rounded-full",
  styles: {
    input: {
    //   "--input-placeholder-color": "var(--mantine-color-text)",
      "--input-bd": "transparent",
      fontWeight: 400,
      "--tw-shadow": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "--tw-shadow-colored": "0 1px 2px 0 var(--tw-shadow-color)",
      boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
    },
  },
};
