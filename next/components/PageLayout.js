import { Container } from 'react-bootstrap';
import Head from 'next/head';
import BlogNavbar from './Navbar';
import Footer from './Footer';
import OuterInto from './OuterIntro';
import { useTheme } from '../providers/ThemeProvider';

export default function PageLayout({ children, className }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme.type}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true" />
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap'
          rel='stylesheet'
        />
      </Head>
      <div>
        <Container>
          <BlogNavbar theme={theme} toggleTheme={toggleTheme}/>
          <OuterInto />
          <div className={`page-wrapper ${className}`}>{children}</div>
          <Footer />
        </Container>
      </div>
      <style jsx global>{`
        html, body {
          background: ${theme.background};
          color: ${theme.fontColor};
          transition: color 0.2s ease-out 0s, background 0.2s ease-out 0s;
        }
      `}</style>
    </div>
  );
}
