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

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  return (
    <Card>
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
