import { ThemeProvider } from './theme';
import { GoogleAnalytics } from '@next/third-parties/google';
import { QueryProvider } from './query';
export default function Page({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
      <GoogleAnalytics gaId="G-Q3LLPR6HBQ" />
    </ThemeProvider>
  );
}
