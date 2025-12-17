import { db } from "@/db";
import { customers } from "@/db/schema";
import CustomerTable from "@/components/CustomerTable";

export default async function Home() {
  const allCustomers = await db.select().from(customers);

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold mb-8">Customer Hub</h1>
      <CustomerTable customers={allCustomers} />
    </div>
  );
}
