import { FC, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { HiCog6Tooth } from "react-icons/hi2";
import { FaClock, FaTrophy, FaUser } from "react-icons/fa";
import { useStore } from "../../hooks";

const Settings: FC = () => {
  const { onOpenChange, isOpen, onOpen } = useDisclosure();
  const { settings, onChangeSettings } = useStore();
  const [newSettings, setNewSettings] = useState(settings);
  return (
    <>
      <Tooltip content="Settings" color="foreground" showArrow placement="left">
        <Button
          isIconOnly
          color="default"
          aria-label="Settings"
          className="fixed top-8 right-8"
          onPress={onOpen}
        >
          <HiCog6Tooth />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        defaultOpen
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Settings
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    type="number"
                    label="How many times can a player win?"
                    placeholder=""
                    value={newSettings.winPerPlayer.toString()}
                    onChange={({ target }) =>
                      setNewSettings({
                        ...newSettings,
                        winPerPlayer: Number.parseInt(target.value),
                      })
                    }
                    labelPlacement="outside"
                    startContent={<FaUser />}
                    min={1}
                    max={99}
                    maxLength={2}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    label="How many seconds delay do you want when the winner is shown?"
                    placeholder=""
                    value={newSettings.delay.toString()}
                    onChange={({ target }) =>
                      setNewSettings({
                        ...newSettings,
                        delay: Number.parseInt(target.value),
                      })
                    }
                    labelPlacement="outside"
                    startContent={<FaClock />}
                    endContent={
                      <span className="text-default-400 text-small">seg</span>
                    }
                    min={1}
                    max={99}
                    maxLength={2}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    label="Winning rounds"
                    placeholder=""
                    value={newSettings.rounds.toString()}
                    onChange={({ target }) =>
                      setNewSettings({
                        ...newSettings,
                        rounds: Number.parseInt(target.value),
                      })
                    }
                    labelPlacement="outside"
                    startContent={<FaTrophy />}
                    min={1}
                    max={99}
                    maxLength={2}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end items-center">
                <Button
                  color="primary"
                  onClick={() => {
                    onChangeSettings(newSettings);
                    onClose();
                  }}
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default Settings;
