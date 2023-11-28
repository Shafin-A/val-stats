import { redirect } from "next/navigation";
import { getPlayerAccount } from "../../../../apis/api";

const Page = async ({ params }: { params: { playerTag: string } }) => {
  const playerNameTag = decodeURIComponent(params.playerTag).split("#");

  const playerAccount = await getPlayerAccount(
    playerNameTag[0],
    playerNameTag[1]
  );

  const puuid = playerAccount.puuid;

  return redirect(`/player/${params.playerTag}/${puuid}`);
};

export default Page;
