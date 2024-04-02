import {
  Card,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";
import styles from "./matchCard.module.css";
import { Match } from "../../../types/types";

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
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat.
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
