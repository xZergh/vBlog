import { Container } from 'react-bootstrap';
import BlogNavbar from './Navbar';
import Footer from './Footer';
import OuterIntro from './OuterIntro';
import { useTheme } from '../providers/ThemeProvider';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageLayout({
  children,
  className = '',
}: PageLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme.type}>
      <div>
        <Container>
          <BlogNavbar theme={theme} toggleTheme={toggleTheme} />
          <OuterIntro />
          <div className={`page-wrapper ${className}`}>{children}</div>
          <Footer />
        </Container>
      </div>
      <style jsx global>{`
        html,
        body {
          background: ${theme.background};
          color: ${theme.fontColor};
          transition:
            color 0.2s ease-out 0s,
            background 0.2s ease-out 0s;
        }
      `}</style>
    </div>
  );
}
