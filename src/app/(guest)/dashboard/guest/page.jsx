// /app/dashboard/guest/page.jsx
"use client";

import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import data from "./data.json"; // if you have some table data

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* Some cards or stats */}
      <SectionCards />

      {/* Chart */}
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      {/* Table */}
      <DataTable data={data} />
    </div>
  );
}
