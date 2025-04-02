import { AppSidebar } from "@/app/components/app-sidebar";
import { ChartAreaInteractive } from "@/app/components/chart-area-interactive";
import { DataTable } from "@/app/components/data-table";
import { SiteHeader } from "@/app/components/site-header";
import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";

import data from "./data.json";
import "./dashboard.css";

export default function Page() {
  return (
    <SidebarProvider
      className="min-h-screen"
      style={
        {
          "--sidebar-width": "16rem",
          "--header-height": "4rem",
          "--spacing": "0.25rem",
          "backgroundColor": "var(--background)",
          "color": "var(--foreground)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 lg:p-6">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-6">
              <div className="px-4 lg:px-6">
                <div className="chart-container">
                  <ChartAreaInteractive />
                </div>
              </div>
              <div className="px-4 lg:px-6">
                <h2 className="text-xl font-semibold mb-4">Dashboard Data</h2>
                <div className="datatable-container">
                  <DataTable data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
