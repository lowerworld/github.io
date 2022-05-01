import withMDX from '@next/mdx';
import rehypeShiki from '@stefanprobst/rehype-shiki';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
import { remarkMdxImages } from 'remark-mdx-images';
import shiki from 'shiki';
import { getAllPosts } from './lib/api.mjs';

export default withMDX({
  options: {
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      remarkMdxImages,
      [remarkMdxFrontmatter, { name: 'meta' }],
    ],
    rehypePlugins: [
      [
        rehypeShiki,
        {
          highlighter: await shiki.getHighlighter({ theme: 'material-darker' }),
        },
      ],
    ],
  },
})({
  exportPathMap: async (defaultPathMap) => {
    const { posts } = await getAllPosts();

    return Object.fromEntries([
      ...Object.entries(defaultPathMap).filter(
        ([key]) => !key.startsWith('/posts/')
      ),
      ...posts.map((post) => [
        `/posts/${post.meta.id}`,
        { page: `/${post.meta.pathname.replace(/\.mdx$/, '')}` },
      ]),
    ]);
  },
  images: { loader: 'custom' },
  pageExtensions: ['tsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.infrastructureLogging = { level: 'error' };
    return config;
  },
});
