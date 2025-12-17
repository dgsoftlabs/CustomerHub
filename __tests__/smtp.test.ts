import { createTransporter, sendEmail, sendBulkEmails } from '@/lib/smtp';

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    verify: jest.fn().mockResolvedValue(true),
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
  })),
}));

describe('SMTP Library Functions', () => {
  beforeEach(() => {
    // Set environment variables for testing
    process.env.SMTP_USER = 'test@example.com';
    process.env.SMTP_PASSWORD = 'testpassword';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('22. createTransporter returns transporter when credentials exist', () => {
    const transporter = createTransporter();
    expect(transporter).not.toBeNull();
  });

  test('23. createTransporter returns null when credentials missing', () => {
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASSWORD;
    
    const transporter = createTransporter();
    expect(transporter).toBeNull();
  });

  test('24. sendEmail simulates sending when no transporter', async () => {
    delete process.env.SMTP_USER;
    
    const result = await sendEmail({
      to: 'recipient@example.com',
      subject: 'Test Subject',
      text: 'Test message',
    });
    
    expect(result.simulated).toBe(true);
    expect(result.success).toBe(true);
  });

  test('25. sendBulkEmails handles multiple recipients', async () => {
    const recipients = ['user1@example.com', 'user2@example.com'];
    
    const result = await sendBulkEmails(
      recipients,
      'Bulk Test',
      'This is a bulk message'
    );
    
    expect(result.sent).toBeGreaterThan(0);
  });
});
