import { get } from '@/lib/request';
import { IUser } from './_type';
import { getLocalfromCountryCode } from '@/lib/utils';
export const getCoorAddress = (params: IUser.getCoorAddressRequest) => {
  if (params['accept-language']) {
    params['accept-language'] = getLocalfromCountryCode(
      params['accept-language'] || 'us'
    );
  }
  return get<IUser.getCoorAddressResponse>(
    'https://nominatim.openstreetmap.org/reverse',
    {
      format: 'json',
      zoom: 18,
      addressdetails: 1,
      ...params,
    }
  );
};

export const getSearchAddress = (params: IUser.getSearchAddressRequest) => {
  if (params['accept-language']) {
    params['accept-language'] = getLocalfromCountryCode(
      params['accept-language'] || 'us'
    );
  }
  return get<IUser.getSearchAddressResponse>(
    'https://nominatim.openstreetmap.org/search',
    {
      format: 'json',
      limit: 5,
      addressdetails: 1,
      ...params,
    }
  );
};
