import { beforeEach, describe, expect, it, vi } from 'vitest';

const getAllBlogsMock = vi.fn();

vi.mock('../../lib/api', () => ({
  getAllBlogs: (...args: Parameters<typeof getAllBlogsMock>) =>
    getAllBlogsMock(...args),
}));

describe('/api/blogs handler', () => {
  beforeEach(() => {
    getAllBlogsMock.mockReset();
  });

  it('returns 405 for non-GET requests', async () => {
    const { default: handler } = await import('../../pages/api/blogs');
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const req = { method: 'POST', query: {} };
    const res = { status, json };

    await handler(req as never, res as never);

    expect(status).toHaveBeenCalledWith(405);
    expect(json).toHaveBeenCalledWith({ message: 'Method not allowed' });
  });

  it('returns paginated results for valid query params', async () => {
    const { default: handler } = await import('../../pages/api/blogs');
    getAllBlogsMock.mockResolvedValue([
      { slug: 'a' },
      { slug: 'b' },
      { slug: 'c' },
      { slug: 'd' },
    ]);

    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const req = {
      method: 'GET',
      query: { page: '1', limit: '2', date: 'asc' },
    };
    const res = { status, json };

    await handler(req as never, res as never);

    expect(getAllBlogsMock).toHaveBeenCalledWith('asc');
    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith({
      blogs: [{ slug: 'c' }, { slug: 'd' }],
      hasMore: false,
      total: 4,
      page: 1,
      limit: 2,
    });
  });

  it('returns 400 for invalid pagination params', async () => {
    const { default: handler } = await import('../../pages/api/blogs');
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const req = { method: 'GET', query: { page: '-1', limit: '0' } };
    const res = { status, json };

    await handler(req as never, res as never);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      message: 'Invalid pagination parameters',
    });
  });

  it('returns 500 when upstream fetch throws', async () => {
    const { default: handler } = await import('../../pages/api/blogs');
    getAllBlogsMock.mockRejectedValue(new Error('Sanity unavailable'));
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const req = { method: 'GET', query: {} };
    const res = { status, json };

    await handler(req as never, res as never);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
