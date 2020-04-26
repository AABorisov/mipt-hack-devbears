import { Method } from 'axios';

const API = {
  plantsData: '/api/plantsData',
  resourceGroupAtDate: '/api/resourceGroupAtDate',
  orderById: '/api/orderById',
};

export default API;

export type BackendEndpointNames = 'plantsData' | 'resourceGroupAtDate' | 'orderById';

export interface EndPoint {
  method: Method;
  url: string;
}

export type BackendEndpoints = {
  [key in BackendEndpointNames]: EndPoint;
};

export type BackendEndpointsFunctions = {
  [key in BackendEndpointNames]: Function;
};

export const BACKEND_ENDPOINTS: BackendEndpoints = {
  plantsData: { method: 'get', url: 'equipment-set-types/list' },
  resourceGroupAtDate: { method: 'get', url: 'equipment-types/list' },
  orderById: { method: 'get', url: 'streets/list' },
};
