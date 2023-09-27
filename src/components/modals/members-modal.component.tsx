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
import { HiUserGroup } from "react-icons/hi2";
import { useStore } from "../../hooks";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

const MembersModal: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { members } = useStore();

  return (
    <>
      <Tooltip content="Members" placement="left" color="danger" showArrow>
        <Button
          isIconOnly
          color="danger"
          aria-label="Settings"
          className="fixed top-24 right-8"
          onPress={onOpen}
        >
          <HiUserGroup />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        defaultOpen
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Members</ModalHeader>
          <ModalBody>
            <ScrollShadow
              hideScrollBar
              className="w-[300px] h-[400px] flex flex-col items-start gap-4"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {members?.map((member: any, index: number) => (
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
export default MembersModal;
