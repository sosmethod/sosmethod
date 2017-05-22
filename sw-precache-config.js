module.exports = {
    navigateFallback: '/index.html',
    stripPrefix: 'dist/www',
    root: 'dist/www/',
    staticFileGlobs: [
        'dist/www/index.html',
        'dist/www/**.js',
        'dist/www/assets/**.css',
        'dist/www/assets/**.js',
        'dist/www/assets/**.jpg',
        'dist/www/assets/fonts/**.tff',
        'dist/www/assets/fonts/**.woff',
        'dist/www/assets/i18n/**.json',
        'dist/www/assets/**.otf',
        'dist/www/assets/**.png'
    ]
    // runtimeCaching: [
    //   {
    //     urlPattern: /\/api\/pokemon\//,
    //     handler: 'networkFirst',
    //     options: {
    //       cache: {
    //         maxEntries: 10,
    //         name: 'api-cache'
    //       }
    //     }
    //   }
    // ]
};