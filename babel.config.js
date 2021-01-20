module.exports = function (api) {
   api.cache(true);

   const devMode = process.env.NODE_ENV === "development";

   const commonPresets = [["@babel/preset-typescript"], ["@babel/preset-react"]];

   let presets = [];

   if (devMode) {
      presets = [...commonPresets];
   }

   if (!devMode) {
      presets = [
         [
            "@babel/preset-env",
            {
               useBuiltIns: "usage",
               corejs: "3.0.1",
               modules: false,
               targets: {
                  chrome: "61",
                  safari: "12",
                  firefox: "60",
                  ie: "11"
               }
            }
         ],
         ...commonPresets
      ];
   }

   const plugins = [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-object-rest-spread",
   ];

   return {
      presets,
      plugins
   };
};
