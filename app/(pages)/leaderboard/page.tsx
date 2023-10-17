import { LeaderboardPlayer } from "../../../types/types";
import { getAllLeaderboardData } from "../../../apis/api";
import { REGIONS } from "../search/page";
import { LeaderboardTable } from "../../components/leaderboardTable";

const Page = async () => {
  const leaderboardData = await getAllLeaderboardData(Object.values(REGIONS));

  return (
    <>
      <LeaderboardTable players={leaderboardData["na"]} playersPerPage={50} />
    </>
  );
};

export default Page;
