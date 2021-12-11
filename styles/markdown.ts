import { css } from '@emotion/css';
import tw from 'twin.macro';

const markdown = css`
  a {
    ${tw`
      text-blue-500
      dark:text-pink-500
    `}

    & > code {
      ${tw`
        p-1
        transition-background-color
        bg-gray-50
        dark:bg-gray-700
      `}
    }
  }

  blockquote {
    ${tw`
      pl-4
      border-l-4
      transition-border-color
      dark:border-gray-700
    `}

    > p {
      ${tw`
        text-gray-400
      `}
    }
  }

  code {
    ${tw`
      text-sm
      rounded-sm
    `}
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${tw`
      pb-2
      mt-6
      mb-4
    `}
  }

  h1,
  h2,
  h3,
  h4 {
    ${tw`
      border-b
      transition-border-color
      dark:border-gray-700
    `}
  }

  h3,
  h4 {
    ${tw`
      border-dashed
    `}
  }

  h4,
  h5,
  h6 {
    ${tw`
      text-lg
    `}
  }

  h1 {
    ${tw`
      text-3xl
    `}
  }

  h2 {
    ${tw`
      text-2xl
    `}
  }

  h3 {
    ${tw`
      text-xl
    `}
  }

  h6 {
    ${tw`
      text-gray-400
    `}
  }

  hr {
    ${tw`
      my-6
      border-t
      transition-border-color
      dark:border-gray-700
    `}
  }

  ol,
  ul {
    ${tw`
      pl-4
      mb-2
    `}
    padding-inline-start: 2rem;
  }

  ol {
    ${tw`
      list-decimal
    `}
  }

  ul {
    ${tw`
      list-disc
    `}
  }

  blockquote,
  ol,
  p,
  ul {
    ${tw`
      mb-3
    `}
  }

  p > code {
    ${tw`
      px-1.5
      py-0.5
      transition-background-color
      text-gray-700
      bg-gray-50
      dark:text-gray-400
      dark:bg-gray-700
    `}
  }

  pre > code {
    ${tw`
      block
      overflow-auto
      p-4
      my-4
      shadow-sm
      bg-gray-900
    `}

    &:not([class]) {
      ${tw`
        text-gray-300
      `}
    }
  }

  table {
    ${tw`
      my-4
      table-auto
    `}

    td,
    th {
      ${tw`
        p-3
        border
        transition-background-border-color
        border-blue-300
        dark:border-gray-600
      `}
    }

    th {
      ${tw`
        text-center
        bg-blue-50
        dark:bg-gray-700
      `}
    }
  }
`;

export default markdown;
