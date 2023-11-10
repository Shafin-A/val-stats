import { getAllLeaderboardData } from "../../../apis/api";
import { REGIONS } from "../search/page";
import { LeaderboardTable } from "../../components/leaderboardTable";

const Page = async () => {
  const leaderboardData = await getAllLeaderboardData(Object.values(REGIONS));

  return (
    <>
      <LeaderboardTable
        leaderboardData={leaderboardData}
        playersPerPage={25}
        paginationPageNumber={5}
      />
    </>
  );
};

export default Page;
