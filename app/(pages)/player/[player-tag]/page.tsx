const Page = async () => {
  const playerData = {
    status: 200,
    data: {
      puuid: "94e2cef0-1b8a-5b95-9d76-cc98acd3c347",
      region: "na",
      account_level: 425,
      name: "Terfin",
      tag: "Omris",
      card: {
        small:
          "https://media.valorant-api.com/playercards/08bfe02a-4400-b046-ea1f-0e99f18269d0/smallart.png",
        large:
          "https://media.valorant-api.com/playercards/08bfe02a-4400-b046-ea1f-0e99f18269d0/largeart.png",
        wide: "https://media.valorant-api.com/playercards/08bfe02a-4400-b046-ea1f-0e99f18269d0/wideart.png",
        id: "08bfe02a-4400-b046-ea1f-0e99f18269d0",
      },
      last_update: "Now",
      last_update_raw: 1697083183,
    },
  };

  return (
    <>
      <img src={playerData.data.card.small} />
      Player
    </>
  );
};

export default Page;
