import { db } from "@/db";
import { customers } from "@/db/schema";
import { Users, TrendingUp, Calendar, Activity, User, AtSign, Phone } from "lucide-react";

export default async function Dashboard() {
  const allCustomers = await db.select().from(customers);
  
  // Calculate statistics
  const totalCustomers = allCustomers.length;
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  
  const customersThisMonth = allCustomers.filter((customer) => {
    if (!customer.createdAt) return false;
    const createdDate = new Date(customer.createdAt);
    return createdDate.getMonth() === thisMonth && createdDate.getFullYear() === thisYear;
  }).length;

  const recentCustomers = allCustomers
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Welcome to CustomerHub</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1 sm:mt-2">{totalCustomers}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">New This Month</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1 sm:mt-2">{customersThisMonth}</p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Active Today</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1 sm:mt-2">42</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Growth Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1 sm:mt-2">+12%</p>
            </div>
            <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Customers */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 sm:p-6 border-b dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold">Recent Customers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Name
                  </div>
                </th>
                <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <AtSign className="h-4 w-4" />
                    Email
                  </div>
                </th>
                <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </div>
                </th>
                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Added
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                      </div>
                      {customer.name}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <AtSign className="h-3.5 w-3.5 text-gray-400" />
                      {customer.email}
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-gray-400" />
                      {customer.phone || '-'}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
