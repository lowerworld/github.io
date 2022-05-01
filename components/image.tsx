import NextImage, { ImageProps } from 'next/image';

export default function Image(props: ImageProps): JSX.Element {
  return <NextImage {...props} unoptimized />;
}
