import { FC } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  Tooltip,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { FaCrown } from "react-icons/fa";
import { useStore } from "../../hooks";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

const WinnersModal: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { winners } = useStore();

  return (
    <>
      <Tooltip content="Winners" placement="left" color="warning" showArrow className="text-white">
        <Button
          isIconOnly
          color="warning"
          aria-label="Settings"
          className="fixed top-40 right-8 text-white"
          onPress={onOpen}
        >
          <FaCrown />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        defaultOpen
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Winners</ModalHeader>
          <ModalBody>
            <ScrollShadow
              hideScrollBar
              className="w-[300px] h-[400px] flex flex-col items-start gap-4"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {winners?.map((member: any, index: number) => (
                <User
                  key={index}
                  name={member?.Name}
                  avatarProps={{
                    src: `${createAvatar(thumbs, {
                      seed: member?.Name,
                      // ... other options
                    }).toDataUriSync()}`,
                  }}
                />
              ))}
            </ScrollShadow>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default WinnersModal;
