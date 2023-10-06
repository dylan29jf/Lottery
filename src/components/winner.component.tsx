/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { useStore } from "../hooks";

const Winner: FC = () => {
  const [rendered, setRendered] = useState<boolean>(false);
  const {
    showWinner,
    settings,
    onChangeShowWinner,
    members,
    onChangeMembers,
    onChangeSettings,
    onChangeWinners,
    winners,
  } = useStore();
  const [timer, setTimer] = useState<number>(0);
  const [nameWinner, setNameWinner] = useState<string>("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const confetiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showWinner) {
      setRendered(true);

      if (confetiRef.current) {
        setSize({
          height: confetiRef.current.clientHeight,
          width: confetiRef.current.clientWidth,
        });
      }

      setTimer(settings.delay);

      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            getWinner();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    } else {
      setRendered(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWinner, settings, onChangeShowWinner]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getWinner = () => {
    const keys = Object.keys(members);

    const randomIndex = Math.floor(Math.random() * keys.length);

    const randomItem = members[keys[randomIndex]];

    const winnerName = randomItem?.Name;

    setNameWinner(winnerName);

    setTimeout(() => {
      updateMembersAndCloseWinner(winnerName);
    }, 10000);
  };

  const updateMembersAndCloseWinner = (winnerName: string) => {
    updateMembers(winnerName);
    setNameWinner("");
    onChangeShowWinner(false);
  };
  const updateMembers = (winner: string) => {
    const newSettings = { ...settings };

    newSettings.rounds = newSettings.rounds - 1;

    onChangeSettings(newSettings);

    updateWinner(winner);

    const filterMembers = members
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.map((item: any) => {
        if (item?.Name.toLowerCase() === winner.toLowerCase()) {
          console.log("first");
          item.timesWon = (item.timesWon || 0) + 1;
        }

        return item;
      })
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.timesWon !== settings.winPerPlayer
      );

    onChangeMembers(filterMembers);
  };

  const updateWinner = (winner: string) => {
    const updateArrayWinner = winners;

    const newWinner = members.find((item: any) => item?.Name === winner);

    updateArrayWinner.push(newWinner);

    onChangeWinners(updateArrayWinner);
  };

  return (
    <div
      className={`flex justify-center items-center w-full h-full absolute ${
        rendered ? "z-50 opacity-100" : "-z-10 opacity-0"
      } transition-all bg-zinc-950/90`}
      ref={confetiRef}
    >
      {timer > 0 && (
        <div className="w-44 h-44 flex justify-center items-center border-3 rounded-full">
          <p className="text-7xl">{timer}</p>
        </div>
      )}

      {nameWinner !== "" && (
        <Confetti
          numberOfPieces={1000}
          width={size.width}
          height={size.height}
        />
      )}
      <p
        className={`text-9xl transition-all ${
          nameWinner !== "" ? "opacity-100" : "opacity-0"
        }`}
      >
        {capitalizeFirstLetter(nameWinner)}
      </p>
    </div>
  );
};
export default Winner;
