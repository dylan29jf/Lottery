import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { InitModal, Lottery } from "./components";
import { useStore } from "./hooks";
import { FaFile, FaArrowRight } from "react-icons/fa";
import React, { useState } from "react";
import { uploadMembers } from "./service";
// import {HiLoad} from 'react-icons/hi2'

function App() {
  const {
    organization,
    onChangeMembers,
    loadMembers,
    onLoadMembers,
    show,
    onChangeShow,
  } = useStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      setTimeout(async () => {
        const data = await uploadMembers(file);

        if (data) {
          onChangeMembers(data);
          onLoadMembers();
        }
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center relative w-screen h-screen">
      <InitModal />

      {organization.length >= 3 && !show && (
        <Card>
          <CardBody>
            <h1 className="text-lg">
              Welcome <span className="font-bold">{organization}</span> 👋
            </h1>
            <p className="mt-2">
              To continue it is important that you load your members
            </p>
            <div className="px-6 my-2">
              <ol className="list-decimal ">
                <li>
                  Load an excel file (.xlsx, .csv) by dragging or clicking on
                  the box below. <br /> Note: The file must contain field "Name"
                </li>
                <li>Click on the upload members button</li>
                <li>Wait for the process to finish</li>
              </ol>
            </div>
            <div
              className={`${
                loadMembers ? "hidden" : "flex"
              } flex-col justify-center items-center w-full h-52 border border-zinc-500 my-4 border-dashed cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition-all rounded-lg`}
            >
              <FaFile />
              <p className="text-zinc-500">
                <b>Choose a file</b> or drag it here.
              </p>
              <input
                type="file"
                name="members"
                id="members"
                className="opacity-0 absolute top-0 left-0 w-full h-full"
                accept=".xlsx, .csv"
                onChange={handleChange}
              />
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-end">
            <Button
              color="primary"
              isDisabled={!loadMembers}
              isLoading={loading}
              endContent={<FaArrowRight />}
              onPress={() => onChangeShow(true)}
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {show && <Lottery />}
    </div>
  );
}

export default App;
