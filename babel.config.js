module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',  // Esto permite que utilices el alias '@' para 'src/'
        },
      },
    ],
  ],
};
