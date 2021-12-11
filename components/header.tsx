import { MarkGithubIcon, MoonIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { toggleTheme } from '~/pages/_app';
import site from '~/site.config';

export default function Header(): JSX.Element {
  return (
    <header className="sticky top-0 flex w-full h-14 shadow transition-background-color bg-white dark:bg-gray-700">
      <div className="container flex justify-between items-center px-4 lg:px-0 mx-auto lg:max-w-screen-md 2xl:max-w-screen-lg">
        <Link href="/">
          <a className="flex items-center h-full text-xl hover:text-blue-500 dark:hover:text-pink-500">
            <span>{site.html.title}</span>
          </a>
        </Link>

        <div className="flex items-center gap-x-2">
          {site.github.url && (
            <a
              className="flex justify-center items-center w-9 h-9"
              href={site.github.url}
              rel="noreferrer"
              target="_blank"
            >
              <MarkGithubIcon />
            </a>
          )}

          <button
            aria-label="Toggle Theme"
            className="
                flex
                justify-center
                items-center
                w-9
                h-9
                rounded-full
                transition-colors
                focus:outline-none
                hover:text-blue-500
                hover:bg-gray-100
                dark:hover:text-yellow-500
                dark:hover:bg-gray-600
              "
            onClick={toggleTheme}
          >
            <MoonIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
