import StyledComponentsRegistry from './lib/registry'
import GlobalStyles from "../styles/GlobalStyles";
import FlexBox from '@/styles/FlexBox';
import { Header,Main,Sidebar } from './components';
import { getAllCategories } from '@/utils/category-api';
import { Noto_Sans_KR } from 'next/font/google';
import { Suspense } from 'react';
import Loading from './components/Loading';
// If loading a variable font, you don't need to specify the font weight
const noto_sans_kr = Noto_Sans_KR({
  weight:"400",
  subsets: ['latin'],
});

async function getCategories() {
  return await getAllCategories();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()
  let loading = false;

  

  return (
    <html lang="en" className={noto_sans_kr.className}>
      <body>
          <StyledComponentsRegistry>
            <GlobalStyles/>
            <Suspense fallback={<Loading/>}>
              {loading ? <Loading/> : ''}
              <Header categories={categories}/>
              <FlexBox>
                <Main>
                  {children}
                </Main>
                <Sidebar categories={categories} />
              </FlexBox>
            </Suspense>
          </StyledComponentsRegistry>
      </body>
    </html>
  )
}
