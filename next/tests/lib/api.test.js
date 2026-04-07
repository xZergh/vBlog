import { beforeEach, describe, expect, it, vi } from 'vitest';

const fetchMock = vi.fn();

vi.mock('../../lib/sanity', () => ({
  default: {
    fetch: (...args) => fetchMock(...args),
  },
}));

describe('lib/api', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it('getAllBlogs defaults to desc sort', async () => {
    const { getAllBlogs } = await import('../../lib/api');
    fetchMock.mockResolvedValue([]);

    await getAllBlogs();

    const [query] = fetchMock.mock.calls[0];
    expect(query).toContain('order(date desc)');
  });

  it('getBlogs supports asc sort and pagination window', async () => {
    const { getBlogs } = await import('../../lib/api');
    fetchMock.mockResolvedValue([]);

    await getBlogs(1, 6, 'asc');

    const [query] = fetchMock.mock.calls[0];
    expect(query).toContain('order(date asc)');
    expect(query).toContain('[6...12]');
  });

  it('getBlogBySlug returns null when slug is invalid', async () => {
    const { getBlogBySlug } = await import('../../lib/api');

    const result = await getBlogBySlug('');

    expect(result).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
