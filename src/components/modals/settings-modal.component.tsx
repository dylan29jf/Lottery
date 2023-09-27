import { FC } from "react";
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

interface IProps {
  isOpen: boolean;
}

const SettingsModal: FC<IProps> = ({ isOpen }) => {
  const { onOpenChange } = useDisclosure();
  const { organization, onChangeOrganization } = useStore();

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      defaultOpen
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Settings</ModalHeader>
            <ModalBody>
              <div className="">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                  className="w-28 h-28 mx-auto"
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
export default SettingsModal;