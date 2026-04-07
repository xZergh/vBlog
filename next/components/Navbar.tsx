import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import type { Theme } from '../context/ThemeContext';

type BlogNavbarProps = {
  theme: Theme;
  toggleTheme: () => void;
};

const BlogNavbar = ({ theme, toggleTheme }: BlogNavbarProps) => {
  return (
    <Navbar
      variant={theme.type}
      className='fj-navbar fj-nav-base'
      bg='transparent'
      expand='lg'
    >
      <Navbar.Brand className='fj-navbar-brand'>
        <Link href='/'>AQA Ninja</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse
        id='basic-navbar-nav'
        className='justify-content-between'
      >
        <Nav className='ms-auto'>
          <Nav.Link
            href='/'
            as={() => (
              <Link href='/' className='fj-navbar-item fj-navbar-link'>
                Home
              </Link>
            )}
          />
          <div className='theme-toggle-container'>
            <label className='theme-toggle'>
              <input
                type='checkbox'
                checked={theme.type === 'dark'}
                onChange={toggleTheme}
                className='theme-toggle-input'
              />
              <span className='theme-toggle-slider'>
                <span className='theme-toggle-icon'>
                  {theme.type === 'light' ? '☀️' : '🌙'}
                </span>
              </span>
            </label>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BlogNavbar;
