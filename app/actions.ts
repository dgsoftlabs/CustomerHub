"use server";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendBulkEmails } from "@/lib/smtp";

export async function addCustomer(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!name || !email) {
    throw new Error("Name and Email are required");
  }

  await db.insert(customers).values({
    name,
    email,
    phone,
  });

  revalidatePath("/");
}

export async function deleteCustomer(id: number) {
  await db.delete(customers).where(eq(customers.id, id));
  revalidatePath("/");
}

export async function sendBulkMessage(formData: FormData) {
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const customerIdsStr = formData.get("customerIds") as string;

  if (!subject || !message || !customerIdsStr) {
    throw new Error("Subject, message, and customer IDs are required");
  }

  const customerIds = customerIdsStr.split(",").map((id) => parseInt(id.trim()));
  
  // Get customer emails
  const selectedCustomers = await db
    .select()
    .from(customers)
    .where(inArray(customers.id, customerIds));

  if (selectedCustomers.length === 0) {
    throw new Error("No valid customers found");
  }

  const recipientEmails = selectedCustomers.map(c => c.email);

  // Create HTML version of the message
  const htmlMessage = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${subject}</h1>
          </div>
          <div class="content">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <div class="footer">
            <p>You received this message from CustomerHub</p>
            <p>If you wish to unsubscribe, please contact us.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    // Send emails using SMTP
    const result = await sendBulkEmails(
      recipientEmails,
      subject,
      message,
      htmlMessage
    );

    console.log("📧 Bulk Message Results:");
    console.log("  Simulated:", result.simulated);
    console.log("  Sent:", result.sent);
    console.log("  Failed:", result.failed);
    if (result.errors && result.errors.length > 0) {
      console.log("  Errors:", result.errors);
    }

    return {
      success: result.success,
      sentCount: result.sent,
      failedCount: result.failed,
      simulated: result.simulated,
      recipients: selectedCustomers.map(c => ({ id: c.id, email: c.email })),
      errors: result.errors,
    };
  } catch (error) {
    console.error("Failed to send bulk message:", error);
    throw new Error("Failed to send bulk message. Please check your SMTP configuration.");
  }
}
