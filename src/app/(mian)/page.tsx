'use client';
import { useStore } from './_store';
import { useEffect } from 'react';
import Show from '@/components/show';
import dynamic from 'next/dynamic';
import { getPerson, getRandomCoor } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getCoorAddress } from './_api';
const Loading = () => (
  <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <div className="text-gray-600 dark:text-gray-400">正在加载地图...</div>
    </div>
  </div>
);
// 动态导入 MapComponent，禁用 SSR
const MapComponent = dynamic(() => import('./_components/map-component'), {
  ssr: false,
  loading: Loading,
});

export default function Page() {
  const {
    coord,
    country_code,
    user,
    setLoadingAddress,
    setCoord,
    setCountryCode,
    setUser,
  } = useStore(); // 获取全局状态管理的 setUser 方法

  useEffect(() => {
    const { coord, country_code } = getRandomCoor();
    setCoord(coord);
    setCountryCode(country_code);
    const user = getPerson(country_code ?? '');
    setUser(user);
  }, []);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['getCoorAddress', coord],
    queryFn: () =>
      getCoorAddress({
        lat: coord[0],
        lon: coord[1],
        'accept-language': country_code ?? '',
      }),
  });
  useEffect(() => {
    setLoadingAddress(isLoading);
  }, [isLoading]);
  useEffect(() => {
    if (data && !isLoading && !isError && user) {
      const osm = data.data;
      setUser({
        ...user,
        display_name: osm.display_name,
        address: {
          ...user.address,
          latitude: osm.lat,
          longitude: osm.lon,
          city: osm.address.city,
          country: osm.address.country ?? '',
          country_code: osm.address.country_code ?? '',
          state: osm.address.state ?? '',
          zipcode: osm.address.postcode ?? '',
        },
      });
    }
    // 都需要作为参数给到url
  }, [data, isLoading, isError, setCoord, setCountryCode]);

  return (
    <Show when={!!coord[0]} fallback={Loading()}>
      <div className="w-full h-screen fixed top-0 left-0 z-10">
        <div className="h-full overflow-hidden shadow-lg">
          <MapComponent lat={coord[0]} lon={coord[1]} />
        </div>
      </div>
    </Show>
  );
}
