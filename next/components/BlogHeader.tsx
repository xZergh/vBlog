import Image from 'next/image';
import { getCompressedImageUrl } from '../lib/utils';
import type { BlogAuthor } from '../lib/api';

type BlogHeaderProps = {
  title?: string;
  subtitle?: string;
  date?: string;
  coverImage?: string;
  author?: BlogAuthor;
};

export default function BlogHeader({
  title,
  subtitle,
  date,
  author,
}: BlogHeaderProps) {
  return (
    <div className='blog-detail-header'>
      <p className='lead mb-0'>
        <Image
          src={
            getCompressedImageUrl(author?.avatar, 50, 50, 'crop') || '/file.svg'
          }
          className='rounded-circle mr-3'
          height={50}
          width={50}
          alt='avatar'
          unoptimized
        />
        {author?.name}
        {', '} {date}
      </p>
      <h1 className='font-weight-bold blog-detail-header-title mb-0'>
        {title}
      </h1>
      <h2 className='blog-detail-header-subtitle mb-3'>{subtitle}</h2>
    </div>
  );
}
