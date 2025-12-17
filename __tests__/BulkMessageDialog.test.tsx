import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BulkMessageDialog from '@/components/BulkMessageDialog';
import type { Customer } from '@/db/schema';

// Mock server action
jest.mock('@/app/actions', () => ({
  sendBulkMessage: jest.fn(),
}));

const mockCustomers: Customer[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', createdAt: new Date() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', createdAt: new Date() },
];

describe('BulkMessageDialog Component', () => {
  test('1. renders dialog when open', () => {
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    expect(screen.getByText('Send Bulk Message')).toBeInTheDocument();
  });

  test('2. does not render when closed', () => {
    const { container } = render(
      <BulkMessageDialog
        isOpen={false}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('3. displays correct number of recipients', () => {
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    expect(screen.getByText('Sending to 2 customers')).toBeInTheDocument();
  });

  test('4. shows recipient list with names and emails', () => {
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/)).toBeInTheDocument();
  });

  test('5. has subject input field', () => {
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    const subjectInput = screen.getByLabelText(/Subject/i);
    expect(subjectInput).toBeInTheDocument();
  });

  test('6. has message textarea field', () => {
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    const messageInput = screen.getByLabelText(/Message/i);
    expect(messageInput).toBeInTheDocument();
  });

  test('7. cancel button closes dialog', async () => {
    const onClose = jest.fn();
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={onClose}
        selectedCustomers={mockCustomers}
      />
    );
    
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);
    
    expect(onClose).toHaveBeenCalled();
  });

  test('8. close icon button closes dialog', async () => {
    const onClose = jest.fn();
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={onClose}
        selectedCustomers={mockCustomers}
      />
    );
    
    const closeButtons = screen.getAllByRole('button');
    const closeIconButton = closeButtons[0]; // First button is the X close button
    fireEvent.click(closeIconButton);
    
    expect(onClose).toHaveBeenCalled();
  });

  test('9. can type in subject field', async () => {
    const user = userEvent.setup();
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    const subjectInput = screen.getByLabelText(/Subject/i) as HTMLInputElement;
    await user.type(subjectInput, 'Special Offer');
    
    expect(subjectInput.value).toBe('Special Offer');
  });

  test('10. can type in message field', async () => {
    const user = userEvent.setup();
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    const messageInput = screen.getByLabelText(/Message/i) as HTMLTextAreaElement;
    await user.type(messageInput, 'Get 50% off today!');
    
    expect(messageInput.value).toBe('Get 50% off today!');
  });

  test('11. send button is present', () => {
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  test('12. displays recipient tags with customer info', () => {
    render(
      <BulkMessageDialog
        isOpen={true}
        onClose={jest.fn()}
        selectedCustomers={mockCustomers}
      />
    );
    
    expect(screen.getByText(/John Doe \(john@example.com\)/)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith \(jane@example.com\)/)).toBeInTheDocument();
  });
});
