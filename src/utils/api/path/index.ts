import get from '../client';
import API from '../constant';
import { PathResponseData } from './types';

export async function getPath(): Promise<PathResponseData> {
  const url: string = API.plantsData;

  const response = await get(url);

  return response;
}
