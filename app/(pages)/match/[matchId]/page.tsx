import { getMatch } from "../../../../apis/api";
import MatchCard from "../../../components/cards/matchCard";
import styles from "./page.module.css";

const Page = async ({ params }: { params: { matchId: string } }) => {
  const match = await getMatch(params.matchId);

  return (
    <div className={styles.page_container}>
      <MatchCard match={match} />
    </div>
  );
};

export default Page;
