import { NextApiHandler } from 'next';
import { stringify } from 'query-string';

const fetchUnsplash = (path: string) => {
  return fetch(`https://api.unsplash.com/${path}`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  }).then((response) => response.json());
};

const unsplashAPIHandler: NextApiHandler = async (apiRequest, apiResponse) => {
  const { path, ...params } = apiRequest.query;
  const stringifiedPath = typeof path === 'string' ? path : path.join('/');
  const withParamsPath = `${stringifiedPath}?${stringify(params)}`;
  const unsplashResponse = await fetchUnsplash(withParamsPath);
  apiResponse.json(unsplashResponse);
};

export default unsplashAPIHandler;
