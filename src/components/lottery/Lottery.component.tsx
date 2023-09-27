import { Avatar, Button } from "@nextui-org/react";
import { FC } from "react";
import { useStore } from "../../hooks";
import { Settings } from "../settings";

const Lottery: FC = () => {
  const { organization } = useStore();
  return (
    <>
      <Settings />
      <div className="absolute top-20">
        <Button color="secondary" variant="shadow" size="lg">
          Comenzar Sorteo
        </Button>
      </div>
      <div className="absolute bottom-52 rotate-45 w-20 h-20 bg-white"></div>
      <div className="flex flex-col gap-4 justify-center items-center absolute bottom-52 w-64 h-10 bg-[#d38f07]  z-50"></div>
      <div className="flex flex-col gap-4 justify-center items-center absolute bottom-3 w-60 h-52 bg-[#f1b107] z-40">
        <Avatar
          isBordered
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          size="lg"
        />
        <p className="text-lg">{organization}</p>
      </div>
    </>
  );
};
export default Lottery;
