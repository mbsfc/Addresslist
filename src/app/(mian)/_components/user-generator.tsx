'use client';
import { useCallback, useRef } from 'react';
import { MapPin, Mail, Lock, Shuffle, History } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useStore } from '../_store';
import { Alert } from '@/components/ui/alert';
import NiceAvatar, { genConfig } from 'react-nice-avatar';
import Show from '@/components/show';
import { Button } from '@/components/ui/button';
import HistoryDrawer from './history-drawer';
import { getPerson, getRandomCoor } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserGenerator() {
  const {
    user: userInfo,
    loadingAddress,
    setHistoryDrawerOpen,
    setUser,
    setCoord,
    setCountryCode,
  } = useStore();
  // 生成新地址
  const handleGenerateNewAddress = useCallback(() => {
    // const newUser = getPerson()
    // setUser(newUser)
    const { coord, country_code } = getRandomCoor();
    setCoord(coord);
    setCountryCode(country_code);
    const newUser = getPerson(country_code ?? '');
    setUser(newUser);
  }, [setUser]);

  // 打开历史记录
  const handleOpenHistory = useCallback(() => {
    setHistoryDrawerOpen(true);
  }, [setHistoryDrawerOpen]);
  // 复制到剪贴板
  const copyToClipboard = useCallback(
    async (text: string | null | undefined, label: string) => {
      try {
        if (!text) return;
        await navigator.clipboard.writeText(text || '');
        toast.success(`已复制${label}`, {
          description: text,
          duration: 2000,
          position: 'top-right',
        });
      } catch (err) {
        console.error('复制失败:', err);
        toast.error('复制失败');
      }
    },
    []
  );
  const avatarRef = useRef<HTMLDivElement>(null);
  const handleDownloadAvatar = async () => {
    const svg = avatarRef.current?.querySelector('svg');
    if (!svg) return;

    // 显示加载提示
    const loadingToast = toast.loading('正在下载头像...', {
      position: 'top-right',
    });

    try {
      // 将SVG转换为字符串
      const svgData = new XMLSerializer().serializeToString(svg);

      // 创建SVG Blob
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // 创建下载链接
      const link = document.createElement('a');
      link.href = svgUrl;
      link.download = `${userInfo?.firstname}_${userInfo?.lastname}_avatar.svg`;
      link.style.display = 'none';

      // 触发下载
      document.body.appendChild(link);
      link.click();

      // 清理资源
      document.body.removeChild(link);
      URL.revokeObjectURL(svgUrl);

      // 关闭加载提示并显示成功消息
      toast.dismiss(loadingToast);
      toast.success('头像已下载为SVG格式', {
        duration: 2000,
        position: 'top-right',
      });
    } catch (error) {
      console.error('下载头像失败:', error);
      toast.dismiss(loadingToast);

      toast.error('下载失败，请重试', {
        duration: 3000,
        position: 'top-right',
      });
    }
  };
  return (
    <div className="absolute bottom-4 left-4 z-[1000]  max-w-[400px] min-w-[200px] text-[13px]">
      <Card>
        <div className="p-3">
          <div className="space-y-2">
            {/* 头部个人信息 */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <div
                  className="text-lg font-bold text-gray-900 dark:text-gray-100 cursor-pointer "
                  onClick={() =>
                    copyToClipboard(
                      `${userInfo?.firstname} ${userInfo?.lastname}`,
                      '姓名'
                    )
                  }
                  title="点击复制姓名"
                >
                  {userInfo?.firstname} {userInfo?.lastname}
                </div>
                <div className="flex items-center gap-2   dark:text-gray-400">
                  <span
                    className="cursor-pointer  transition-colors"
                    onClick={() =>
                      copyToClipboard(userInfo?.birthday || '', '生日')
                    }
                    title="点击复制生日"
                  >
                    {userInfo?.birthday}
                  </span>
                </div>
                <div
                  onClick={() => copyToClipboard(userInfo?.phone, '电话号码')}
                  className="flex items-center gap-2  dark:text-gray-400"
                >
                  <span className="">{userInfo?.phone}</span>
                </div>
              </div>
              <Avatar
                ref={avatarRef}
                onClick={handleDownloadAvatar}
                className="w-[80px] h-[80px] border-border  shadow-md cursor-pointer hover:opacity-80 transition-opacity rounded-[20%]"
              >
                <NiceAvatar
                  className="w-full h-full"
                  {...genConfig(userInfo?.email)}
                  shape="square"
                />
              </Avatar>
            </div>

            {/* 联系信息 */}
            <div className="space-y-1 ">
              <div
                className="flex items-center gap-2 rounded   cursor-pointer transition-colors"
                onClick={() => copyToClipboard(userInfo?.email, '邮箱地址')}
                title="点击复制邮箱"
              >
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="">{userInfo?.email}</span>
              </div>

              <div
                className="flex items-center gap-2   cursor-pointer transition-colors"
                onClick={() => copyToClipboard(userInfo?.password, '邮箱密码')}
                title="点击复制邮箱密码"
              >
                <Lock className="w-4 h-4 text-gray-400" />
                <span className="">{userInfo?.password}</span>
              </div>
            </div>

            {/* 地址信息 */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <Show
                when={!loadingAddress}
                fallback={
                  <div className="space-y-1">
                    <Skeleton className="h-[20px] w-full rounded-sm" />
                    <Skeleton className="h-[20px] w-[60%] rounded-sm " />
                  </div>
                }
              >
                <div
                  className="flex items-start gap-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                  title="点击复制完整地址"
                >
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div
                      onClick={() =>
                        copyToClipboard(userInfo?.display_name, '完整地址')
                      }
                      className=""
                    >
                      {userInfo?.display_name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <Show when={!!userInfo?.address.city}>
                        <span
                          onClick={() =>
                            copyToClipboard(userInfo?.address.city, '城市')
                          }
                        >
                          {userInfo?.address.city} •
                        </span>
                      </Show>
                      <Show when={!!userInfo?.address.city}>
                        <span
                          onClick={() =>
                            copyToClipboard(userInfo?.address.state, '州/省')
                          }
                        >
                          {userInfo?.address.state} •
                        </span>
                      </Show>
                      <Show when={!!userInfo?.address.zipcode}>
                        <span
                          onClick={() =>
                            copyToClipboard(
                              userInfo?.address.zipcode,
                              '邮政编码'
                            )
                          }
                        >
                          {userInfo?.address.zipcode}
                        </span>
                      </Show>
                    </div>
                  </div>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex items-center justify-between gap-2 my-2">
        <Button
          variant="outline"
          className="flex-[4]"
          onClick={handleOpenHistory}
        >
          <History className="h-3 w-3 mr-1" />
          历史记录
        </Button>
        <Button
          variant="default"
          className="flex-[6] border-[rgba(255,255,255,.1)] border-solid border"
          onClick={handleGenerateNewAddress}
        >
          <Shuffle className="h-3 w-3 ml-1" />
          生成新地址
        </Button>
      </div>
      <Alert className="mt-2 text-xs  border-none bg-gray-100  text-gray-500 dark:text-gray-400">
        <span className="font-semibold">提示:</span>{' '}
        点击任何信息可复制到剪贴板，头像可下载。点击地图任意点或生成新地址可重新生成信息
      </Alert>

      {/* 历史记录抽屉 */}
      <HistoryDrawer />
    </div>
  );
}
