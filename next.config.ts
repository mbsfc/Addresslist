import type { NextConfig } from 'next';
import dayjs from 'dayjs';

process.env.NEXT_PUBLIC_BUILD_TIME = dayjs().format('YYYY-MM-DD HH:mm');
const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
};

export default nextConfig;
