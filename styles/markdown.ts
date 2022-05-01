import { css } from '@emotion/react';

const markdownStyles = css`
  .shiki {
    display: flex;
    padding-left: 0;
    padding-right: 0;

    code {
      flex: none;
      min-width: 100%;

      .line {
        display: inline-block;
        min-width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;

        &.highlighted {
          background-color: rgb(12 74 110 / 0.3);
        }

        &:last-child {
          display: none;
        }
      }
    }
  }

  /* .shiki {
    code {
      counter-increment: step 0;
      counter-reset: step;

      .line {
        padding-left: 0.5rem;
        padding-right: 1rem;

        &::before {
          border-right: 1px solid rgb(63 63 70 / 0.5);
          color: rgb(113 113 122 / 0.5);
          content: counter(step);
          counter-increment: step;
          display: inline-block;
          margin-right: 1rem;
          padding-right: 0.5rem;
          text-align: right;
          width: 2rem;
        }
      }
    }
  } */
`;

export default markdownStyles;
