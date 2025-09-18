const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-poppins)", ...fontFamily.sans],
        body: ["var(--font-roboto)", ...fontFamily.sans],
      },
    },
  },
};
