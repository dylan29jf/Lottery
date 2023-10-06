import { Avatar, Button } from "@nextui-org/react";
import { FC } from "react";
import { useStore } from "../../hooks";
import { Settings } from "../settings";
import { MembersModal, Winner, WinnersModal } from "..";
import { exportExcelFile } from "../../service";
import { FaFileExcel } from "react-icons/fa";

const Lottery: FC = () => {
  const {
    organization,
    onChangeShowWinner,
    logoOrganization,
    settings,
    members,
    winners,
  } = useStore();
  return (
    <>
      <Settings />
      <MembersModal />
      <WinnersModal />
      <div className="absolute top-20">
        {settings.rounds === 0 ? (
          <Button
            color="success"
            variant="shadow"
            size="lg"
            onPress={() => exportExcelFile(winners)}
            className="text-white"
            isDisabled={winners - length === 0}
            endContent={<FaFileExcel />}
          >
            Export excel file
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="shadow"
            size="lg"
            onPress={() => onChangeShowWinner(true)}
            isDisabled={settings.rounds === 0 || members.length === 0}
          >
            Start draw
          </Button>
        )}
      </div>
      <div className="absolute bottom-52 rotate-45 w-20 h-20 bg-white"></div>
      <div className="flex flex-col gap-4 justify-center items-center absolute bottom-52 w-64 h-10 bg-[#d38f07]  z-50"></div>
      <div className="flex flex-col gap-4 justify-center items-center absolute bottom-3 w-60 h-52 bg-[#f1b107] z-40">
        <Avatar isBordered src={logoOrganization} size="lg" />
        <p className="text-lg">{organization}</p>
      </div>
      <Winner />
    </>
  );
};
export default Lottery;
