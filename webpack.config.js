module.exports = {
  entry: "./src/index.tsx",
  // output: {
  //     filename: "bundle.js",
  //     path: __dirname + "/dist"
  // },
  mode: "development",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    byDependency: {
      // More options can be found here https://webpack.js.org/configuration/resolve/
      less: {
        mainFiles: ["custom"],
      },
    },
    // plugins: [
    //   new DynamicAliasResolvePlugin({
    //     alias: ['@/'],
    //     dynamic: (request, _) => {
    //       return getRealPath(request);
    //     }
    //   })
    // ],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'
          // {
          //   loader: 'less-loader',
          //   options: {
          //     lessOptions: {
          //       javascriptEnabled: true,
          //     }
          //   }
          // }
        ],
      }
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      // {
      //   test: /\.tsx?$/,
      //   loader: "awesome-typescript-loader"
      // },

      // // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   loader: "source-map-loader"
      // }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },
};