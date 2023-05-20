import StyledComponentsRegistry from '../lib/registry'
import GlobalStyles from "../styles/GlobalStyles";
import FlexBox from '@/styles/FlexBox';
import { Header,Main,Sidebar } from './components';
import { getAllCategories } from '@/utils/category-api';
import { Noto_Sans_KR } from 'next/font/google';
import { Metadata } from 'next';

const noto_sans_kr = Noto_Sans_KR({
  weight:"400",
  subsets: ['latin'],
});

async function getCategories() {
  return await getAllCategories();
}

export const metadata: Metadata = {
  title:"JJH's Blog",
  description:"공부한 내용을 정리하는 블로그입니다."
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html lang="en" className={noto_sans_kr.className}>
      <link rel="icon" href="/icon/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png"/>
      <link rel="apple-touch-icon" href="/icon/apple-touch-icon.png" type="image/png"/>
      <body>
          <StyledComponentsRegistry>
            <GlobalStyles/>
            <Header categories={categories}/>
            <FlexBox>
              <Main>
                {children}
              </Main>
              <Sidebar categories={categories} />
            </FlexBox>
          </StyledComponentsRegistry>
      </body>
    </html>
  )
}
