import { db } from "@/db";
import { customers } from "@/db/schema";
import CustomerTable from "@/components/CustomerTable";

export default async function Home() {
  const allCustomers = await db.select().from(customers);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Customer Hub</h1>
      <CustomerTable customers={allCustomers} />
    </div>
  );
}
