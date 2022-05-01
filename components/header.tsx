import { MarkGithubIcon, MoonIcon } from '@primer/octicons-react';
import Link from 'next/link';
import { toggleTheme } from '~/pages/_app';
import site from '~/site.config';

export default function Header(): JSX.Element {
  return (
    <header className="fixed z-50 h-14 w-full border-b border-white/60 bg-white/60 shadow-sm backdrop-blur-md dark:border-zinc-700/50 dark:bg-zinc-800/50">
      <div className="container mx-auto flex h-full max-w-screen-lg items-center justify-between px-4 xl:px-0 2xl:max-w-screen-xl">
        <Link href="/">
          <a className="flex items-center self-stretch text-base sm:text-lg 2xl:text-xl">
            <div className="flex items-baseline">
              <span className="dark:text-white">lowerworld</span>

              <div className="text-xs text-black/40 dark:text-zinc-500 xl:text-sm">
                <span className="dark:text-sky-700">.</span>
                <span>github</span>
                <span className="dark:text-sky-700">.</span>
                <span>io</span>
              </div>
            </div>
          </a>
        </Link>

        <div className="flex items-center gap-x-2">
          {site.github.url && (
            <a
              aria-label="GitHub Repository"
              className="flex h-9 w-9 items-center justify-center text-zinc-500"
              href={site.github.url}
              rel="noreferrer"
              target="_blank"
            >
              <MarkGithubIcon />
            </a>
          )}

          <button
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:bg-gray-100 hover:text-blue-500 focus:outline-none dark:hover:bg-gray-600 dark:hover:text-yellow-500"
            onClick={toggleTheme}
          >
            <MoonIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
