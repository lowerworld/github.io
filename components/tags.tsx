import Link from 'next/link';

type Props = { tags: string[]; selectedTag?: string; link?: boolean };

export default function Tags({
  tags,
  selectedTag,
  link = true,
}: Props): JSX.Element {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) =>
        tag === selectedTag ? (
          <span
            className="
              px-2
              py-0.5
              truncate
              rounded-sm
              border
              transition-background-border-color
              cursor-default
              text-white
              bg-blue-400
              border-blue-400
              dark:text-pink-500
              dark:bg-gray-600
              dark:border-gray-800
            "
            key={`tag-${tag}`}
            title={tag}
          >
            {tag}
          </span>
        ) : link ? (
          <Link
            href={{ pathname: '/tags/[tag]', query: { tag } }}
            key={`tag-${tag}`}
          >
            <a
              className="
                px-2
                py-0.5
                truncate
                rounded-sm
                border
                transition-colors
                text-blue-500
                hover:bg-blue-100
                border-blue-100
                dark:text-gray-500
                dark:hover:text-pink-500
                dark:bg-gray-700
                dark:hover:bg-gray-600
                dark:border-gray-800
              "
              title={tag}
            >
              {tag}
            </a>
          </Link>
        ) : (
          <span
            className="
              px-2
              py-0.5
              truncate
              rounded-sm
              border
              transition-border-color
              cursor-default
              text-gray-300
              border-gray-200
              dark:text-gray-600
              dark:border-gray-700
            "
            key={`tag-${tag}`}
          >
            {tag}
          </span>
        )
      )}
    </div>
  );
}
