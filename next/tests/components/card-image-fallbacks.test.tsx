import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardItem from '../../components/CardItem';
import CardListItem from '../../components/CardListItem';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe('card image fallbacks', () => {
  it('falls back to /file.svg for CardItem avatar and cover', () => {
    render(<CardItem title='Post' subtitle='Subtitle' />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/file.svg');
    expect(images[1]).toHaveAttribute('src', '/file.svg');
  });

  it('falls back to /file.svg for CardListItem avatar', () => {
    render(<CardListItem title='Post' subtitle='Subtitle' />);
    const avatar = screen.getByRole('img', { name: 'avatar' });
    expect(avatar).toHaveAttribute('src', '/file.svg');
  });
});
