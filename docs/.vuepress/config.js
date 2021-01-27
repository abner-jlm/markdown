module.exports = {
  title: '博客文档',
  description: 'abner',
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  base: '/doc',
  port: 9090,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/font/' },
      { text: '面试', link: '/interview/' },
      { text: 'External', link: 'http://foreverheart.top' },
      { text: 'gitHub', link: 'https://github.com/abner-jlm/markdown' },
    ],
    sidebarDepth: 2,
    sidebar: {
      '/font/': [
        '',
        'http',
        'react'
      ],
      '/interview/': [
        '', '面试题'
      ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'image': '/assets/img',
        '@alias': '/'
      }
    }
  }
}