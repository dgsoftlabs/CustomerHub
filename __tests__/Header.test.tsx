import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

// Mock useAuth hook
jest.mock('@/lib/auth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    logout: jest.fn(),
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Header Component', () => {
  test('13. renders CustomerHub title', () => {
    render(<Header />);
    expect(screen.getByText('CustomerHub')).toBeInTheDocument();
  });

  test('14. displays logout button when authenticated', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('15. shows user icon in header', () => {
    const { container } = render(<Header />);
    // Check if SVG icon is present (Lucide icons render as SVG)
    const svgElements = container.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });
});
