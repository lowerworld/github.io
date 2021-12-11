import { Site } from '~/types/site.config';

export default {
  html: {
    lang: 'ja',
    title: 'lowerworld.github.io',
    description: 'lowerworld.github.io: Weblog with GitHub Gist.',
  },
  github: {
    url: 'https://github.com/lowerworld/github.io',
    gist: {
      login: 'lowerworld',
      fileNameFilter: /\[gh-pages\]/,
      private: true,
    },
  },
} as Site.Config;
