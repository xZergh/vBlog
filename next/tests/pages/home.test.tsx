import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

const useGetBlogsPagesMock = vi.fn();

vi.mock('../../lib/api', () => ({
  getAllBlogs: vi.fn(),
}));

vi.mock('../../actions/pagination', () => ({
  useGetBlogsPages: (...args: unknown[]) => useGetBlogsPagesMock(...args),
}));

vi.mock('../../components/PageLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='layout'>{children}</div>
  ),
}));

vi.mock('../../components/FilterMenu', () => ({
  default: () => <div data-testid='filter-menu' />,
}));

vi.mock('../../components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../../components/BlogErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('HomePage', () => {
  beforeEach(() => {
    useGetBlogsPagesMock.mockReset();
  });

  it('renders load-more CTA and calls loadMore on click', async () => {
    const { default: HomePage } = await import('../../pages/index');
    const loadMore = vi.fn();
    useGetBlogsPagesMock.mockReturnValue({
      renderBlogs: () => <div>blog cards</div>,
      loadMore,
      isLoadingMore: false,
      isReachingEnd: false,
      isEmpty: false,
      error: undefined,
    });

    render(<HomePage blogs={[]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Load More Blogs' }));

    expect(loadMore).toHaveBeenCalledTimes(1);
  });

  it('shows end-of-list message and hides load-more when reaching end', async () => {
    const { default: HomePage } = await import('../../pages/index');
    useGetBlogsPagesMock.mockReturnValue({
      renderBlogs: () => <div>blog cards</div>,
      loadMore: vi.fn(),
      isLoadingMore: false,
      isReachingEnd: true,
      isEmpty: false,
      error: undefined,
    });

    render(<HomePage blogs={[]} />);

    expect(screen.queryByRole('button', { name: 'Load More Blogs' })).toBeNull();
    expect(
      screen.getByText("You've reached the end of the blogs!")
    ).toBeInTheDocument();
  });

  it('renders API error state with message', async () => {
    const { default: HomePage } = await import('../../pages/index');
    useGetBlogsPagesMock.mockReturnValue({
      renderBlogs: () => null,
      loadMore: vi.fn(),
      isLoadingMore: false,
      isReachingEnd: false,
      isEmpty: true,
      error: new Error('Request failed with 500'),
    });

    render(<HomePage blogs={[]} />);

    expect(screen.getByText('Error Loading Blogs')).toBeInTheDocument();
    expect(
      screen.getByText(/Request failed with 500/i)
    ).toBeInTheDocument();
  });
});
