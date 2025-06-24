'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getSearchAddress } from '../_api';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '../_store';
import { getPerson } from '@/lib/utils';
import { IUser } from '../_type';
import { useDebounce } from '@/hooks/use-debounce';

interface MapSearchProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function MapSearch({ onLocationSelect }: MapSearchProps) {
  const { setUser, country_code } = useStore();
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 1000); // 防抖 500ms

  const { isLoading, data } = useQuery({
    queryKey: ['searchAddress', debouncedQuery],
    queryFn: () =>
      getSearchAddress({ q: debouncedQuery, 'accept-language': country_code }),
    enabled: !!query.trim(),
  });

  useEffect(() => {
    if (data && data.data.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [data]);

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (result: IUser.getCoorAddressResponse) => {
    if (result) {
      onLocationSelect(result.lat, result.lon, result.display_name);
      const newUser = getPerson(result?.address?.country_code ?? ''); // 更新全局坐标状态
      setUser(newUser);
      setQuery(result.display_name);
      setShowResults(false);
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (data && data.data.length > 0) {
      setShowResults(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    inputRef.current?.focus();
  };

  return (
    <div
      className="absolute top-4 left-4 z-[1000] w-80 max-w-[calc(100vw-2rem)] sm:max-w-80"
      ref={searchRef}
      data-map-control
    >
      <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border shadow-lg">
        <div className="relative">
          {/* 搜索输入框 */}
          <div className="flex items-center p-3">
            <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
            <input
              ref={inputRef}
              type="text"
              placeholder="搜索地点..."
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
            />
            {isLoading && <Loader2 className="h-4 w-4  animate-spin ml-2" />}
            {query && !isLoading && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 ml-2  "
                onClick={clearSearch}
              >
                ×
              </Button>
            )}
          </div>

          {/* 搜索结果列表 */}
          {showResults && data && data.data.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto">
              {data.data.map((result) => (
                <button
                  key={result.place_id}
                  className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-b-0 transition-colors"
                  onClick={() => handleLocationSelect(result)}
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4  mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                        {result.display_name.split(',')[0]}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {result.display_name}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 无搜索结果 */}
          {showResults &&
            data &&
            data.data.length === 0 &&
            query.trim() &&
            !isLoading && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                未找到相关地点
              </div>
            )}
        </div>
      </Card>
    </div>
  );
}
