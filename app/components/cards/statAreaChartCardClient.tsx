"use client";

import { AreaChart, Card, Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import { valueFormatter } from "./statAreaChartCard";

export const StatAreaChartCardClient = ({
  stats,
  data,
}: {
  stats: string[];
  data: Record<string, string | number>[];
}) => {
  const [value, setValue] = useState(stats[3]);

  return (
    <Card>
      <div className="max-w-sm mx-auto mb-4 space-y-6">
        <Select
          value={value}
          onValueChange={setValue}
          defaultValue={stats[3]}
          enableClear={false}
        >
          {stats.map((stat) => (
            <SelectItem key={stat} value={stat}>
              {stat}
            </SelectItem>
          ))}
        </Select>
      </div>
      <span className="chart-title">Avg {value} per games</span>
      <AreaChart
        className="h-52"
        data={data}
        index="gameStartTime"
        categories={[value]}
        colors={["red"]}
        valueFormatter={(num) => valueFormatter(num, value)}
        showXAxis={false}
      />
    </Card>
  );
};
