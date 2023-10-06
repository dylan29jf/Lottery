import { FC, useEffect } from "react";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { HiBuildingOffice } from "react-icons/hi2";
import { useStore } from "../../hooks";
import toast from "react-hot-toast";

const InitModal: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { organization, onChangeOrganization, logoOrganization, onChangeLogo } =
    useStore();

  const handleChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        onChangeLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file, only images are accepted");
    }
  };

  useEffect(() => {
    onOpen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      defaultOpen
      onOpenChange={onOpenChange}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Lottery</ModalHeader>
            <ModalBody>
              <div className="flex justify-center items-center relative">
                <Avatar
                  src={logoOrganization}
                  className="w-28 h-28 mx-auto cursor-pointer"
                />
                <input
                  type="file"
                  name="members"
                  id="members"
                  className="opacity-0 z-10 absolute top-0 left-0 right-0 w-28 h-28 mx-auto rounded-full"
                  accept="image/"
                  onChange={handleChangeLogo}
                />
              </div>
              <div className="mt-4">
                <Input
                  label="Organization"
                  name="organization"
                  value={organization}
                  onChange={(e) => onChangeOrganization(e.target.value)}
                  placeholder="Enter your organization"
                  startContent={<HiBuildingOffice />}
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-end items-center">
              <Button
                color="primary"
                onClick={onClose}
                isDisabled={organization.length <= 3}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default InitModal;
