require("dotenv").config();
module.exports = {
  siteMetadata: {
    title: 'dangout',
    description: ''
  },
  plugins: [
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     typeName: "query",
    //     fieldName: "token",
    //     url: "http://localhost:3000/graphql",
    //   }
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Dangout",
        short_name: "Dangout",
        start_url: "/",
        background_color: "#6b37bf",
        theme_color: "#6b37bf",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        // icon: "src/images/icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    },
  ]
};
