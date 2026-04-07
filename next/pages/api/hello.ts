import type { NextApiRequest, NextApiResponse } from 'next';

type HelloResponse = {
  message: string;
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<HelloResponse>
) {
  res.status(200).json({ message: 'Hello, Sanity.js!' });
}
