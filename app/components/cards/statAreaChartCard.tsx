import { formatDate, getAvgStatsArrayForMatches } from "../../helpers";
import { getPlayerAccount, getPlayerMatches } from "../../../apis/api";
import { StatAreaChartCardClient } from "./statAreaChartCardClient";

interface statAreaChartCardProps {
  playerNameTag: string[];
}

export const valueFormatter = (number: number, stat: string): string => {
  return stat === "HSP"
    ? number.toFixed(1) + "%"
    : stat === "DDΔ"
    ? Math.round(number).toString()
    : stat === "K/D"
    ? number.toFixed(2)
    : number.toFixed(1);
};

export const StatAreaChartCard = async ({
  playerNameTag,
}: statAreaChartCardProps) => {
  const statShortNames = {
    AvgDamageDeltaForMatch: "DDΔ",
    ADRForMatch: "ADR",
    ACSForMatch: "ACS",
    avgHeadShotPercentage: "HSP",
    KD: "K/D",
    KAST: "KAST",
  } as Record<string, string>;

  const playerAccount = await getPlayerAccount(
    playerNameTag[0],
    playerNameTag[1]
  );

  const recentMatches = await getPlayerMatches(
    playerAccount.region,
    playerAccount.name,
    playerAccount.tag,
    10,
    "competitive"
  );

  const avgStatsArray = getAvgStatsArrayForMatches(
    recentMatches,
    playerAccount.puuid
  );

  // Process and format data for chart
  const updatedData = avgStatsArray
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

  return <StatAreaChartCardClient data={updatedData} stats={stats} />;
};
