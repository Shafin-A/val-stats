"use client";
import { AreaChart, Card, Select, SelectItem, Title } from "@tremor/react";
import { useState } from "react";
import "./statAreaChartCard.css";
import { formatDate } from "../helpers";

interface statAreaChartCardProps {
  data: Record<string, number>[];
}

const valueFormatter = (number: number, stat: string): string => {
  return stat === "HSP"
    ? number.toFixed(1) + "%"
    : stat === "DDΔ"
    ? Math.round(number).toString()
    : stat === "K/D"
    ? number.toFixed(2)
    : number.toFixed(1);
};

export const StatAreaChartCard = ({ data }: statAreaChartCardProps) => {
  const statShortNames = {
    AvgDamageDeltaForMatch: "DDΔ",
    ADRForMatch: "ADR",
    ACSForMatch: "ACS",
    avgHeadShotPercentage: "HSP",
    KD: "K/D",
    KAST: "KAST",
  } as Record<string, string>;

  // Process and format data for chart
  const updatedData = data
    .map((record) => {
      const updatedRecord = Object.keys(record).reduce((acc, oldKey) => {
        const newKey = statShortNames[oldKey] || oldKey; // Use short names for display on chart
        acc[newKey] =
          oldKey === "gameStartTime" // Format the unix timestamp to readable date and time
            ? formatDate(record[oldKey])
            : record[oldKey];
        return acc;
      }, {} as Record<string, string | number>);

      return updatedRecord;
    })
    .reverse(); // Original data is sorted latest game -> oldest game, x-axis would be backwards

  const stats = Object.values(statShortNames);
  const [value, setValue] = useState(stats[3]);

  return (
    <Card>
      <div className="max-w-sm mx-auto space-y-6">
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
      <Title className="mt-4">Avg {value} per games</Title>
      <AreaChart
        className="h-52 mt-4"
        data={updatedData}
        index="gameStartTime"
        categories={[value]}
        colors={["red"]}
        valueFormatter={(num) => valueFormatter(num, value)}
        showXAxis={false}
      />
    </Card>
  );
};
