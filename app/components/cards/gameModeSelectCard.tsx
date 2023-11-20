import { Card, Select, SelectItem } from "@tremor/react";
import styles from "./gameModeSelectCard.module.css";

export const GameModeSelectCard = () => {
  return (
    <Card>
      <span className={styles.game_mode_title}>Game Mode</span>
      <Select
        className={styles.game_mode_select}
        defaultValue="Competitive"
        enableClear={false}
      >
        <SelectItem value={"Competitive"}>Competitive</SelectItem>
      </Select>
    </Card>
  );
};
