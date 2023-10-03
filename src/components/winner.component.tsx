import { FC, useEffect, useState } from "react";
import { useStore } from "../hooks";


const Winner: FC = () => {
  const [rendered, setRendered] = useState<boolean>(false);
  const { showWinner, settings, onChangeShowWinner } = useStore();
  const [timer, setTimer] = useState<number>(0);
  

  useEffect(() => {
    if (showWinner) {
      setRendered(true);

      setTimer(settings.delay)

      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            onChangeShowWinner(false); // Cierra la ventana modal al finalizar
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

  }, [showWinner, settings, onChangeShowWinner]);

  return (
    <div
      className={`flex justify-center items-center w-full h-full absolute ${
        rendered ? "z-50 opacity-100" : "-z-10 opacity-0"
      } transition-all bg-zinc-950/90`}
    >
      <p className="text-9xl w-36 h-36 text-center border-2 rounded-full">{timer}</p>

    </div>
  );
};
export default Winner;
