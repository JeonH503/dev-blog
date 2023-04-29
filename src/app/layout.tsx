import StyledComponentsRegistry from './lib/registry'
import GlobalStyles from "../styles/GlobalStyles";
import { Header,Main } from './components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles/>
          <Header/>
          <Main>
            {children}
          </Main>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
