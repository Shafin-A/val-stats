import {
  Card,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
} from "@tremor/react";
import styles from "./matchCard.module.css";
import { Match } from "../../../types/types";
import MatchTable from "../matchTable";
import { formatDate } from "../../helpers";
import { MatchSummary } from "../matchSummary";

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const gameLengthInSeconds = match.metadata.game_length;
  const gameLengthDate = new Date(gameLengthInSeconds * 1000);

  return (
    <Card>
      <div className={styles.match_data_container}>
        <div className={styles.match_mode_map_container}>
          <span className={styles.grey_text}>{match.metadata.mode}</span>
          <span className={styles.bold_text}>{match.metadata.map}</span>
        </div>
        <div className={styles.match_score_container}>
          <span className={styles.grey_text}>Score</span>
          <div className={styles.match_score}>
            <span className={styles.bold_text} style={{ color: "#74d5d3" }}>
              {match.teams.blue.rounds_won}
            </span>
            <span className={styles.bold_text}>:</span>
            <span className={styles.bold_text} style={{ color: "#df3a3a" }}>
              {match.teams.red.rounds_won}
            </span>
          </div>
        </div>
        <div className={styles.match_length_container}>
          <span className={styles.grey_text}>
            {formatDate(match.metadata.game_start)}{" "}
          </span>
          <div>
            <span className={styles.bold_text}>
              {gameLengthDate.getMinutes()}m
            </span>{" "}
            <span className={styles.bold_text}>
              {gameLengthDate.getSeconds()}s
            </span>
          </div>
        </div>
      </div>
      <TabGroup>
        <TabList className={styles.tab_list} variant="line" defaultValue="1">
          <Tab className={styles.tab} value="1">
            Scoreboard
          </Tab>
          <Tab className={styles.tab} value="2">
            Performance
          </Tab>
          <Tab className={styles.tab} value="3">
            Timeline
          </Tab>
          <Tab className={styles.tab} value="4">
            Duels
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <MatchSummary match={match} />
            <MatchTable match={match} players={match.players.blue} />
            <Divider>VS</Divider>
            <MatchTable match={match} players={match.players.red} />
          </TabPanel>
          <TabPanel>
            <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr.
            </p>
          </TabPanel>
          <TabPanel>
            <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Caaa nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr.
            </p>
          </TabPanel>
          <TabPanel>
            <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Dadasd nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr.
            </p>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};

export default MatchCard;
