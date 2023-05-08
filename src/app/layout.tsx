import StyledComponentsRegistry from './lib/registry'
import GlobalStyles from "../styles/GlobalStyles";
import FlexBox from '@/styles/FlexBox';
import { Header,Main,Sidebar } from './components';
import { getAllCategories } from '@/utils/category-api';


async function getCategories() {
  return await getAllCategories();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <html lang="en">
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
