import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  test('16. renders CustomerHub name in footer', () => {
    render(<Footer />);
    expect(screen.getByText('CustomerHub')).toBeInTheDocument();
  });

  test('17. displays current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  test('18. has Dashboard link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Dashboard/i })).toBeInTheDocument();
  });

  test('19. has Customers link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Customers/i })).toBeInTheDocument();
  });

  test('20. has Settings link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /Settings/i })).toBeInTheDocument();
  });

  test('21. displays company description', () => {
    render(<Footer />);
    expect(screen.getByText(/modern customer management solution/i)).toBeInTheDocument();
  });
});
