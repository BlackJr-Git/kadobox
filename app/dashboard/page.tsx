import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentOrdersTable } from "@/components/recent-orders-table"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardStats />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <div className="px-4 lg:px-6">
            <h2 className="mb-4 text-lg font-bold">Commandes récentes</h2>
            <RecentOrdersTable />
          </div>
        </div>
      </div>
    </div>
  )
}
