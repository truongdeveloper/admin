import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

import { Button } from "@nextui-org/button";

import React from "react";

type IConfirmModal = {
  isOpen: boolean;
  setIsOpen: any;
  title?: string;
  content?: string;
  icon?: React.ReactNode;
  onConfirm?: any;
};

export const ConfirmModal = ({
  title,
  content,
  icon,
  isOpen,
  setIsOpen,
  onConfirm,
}: IConfirmModal) => {
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={toggle}>
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <div className="text-center">
                  <div style={{ fontSize: "64px" }} className="text-inherit ">
                    {icon}
                  </div>

                  <p style={{ fontWeight: 500, fontSize: "17px" }}>{content}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={toggle}>
                  Đóng
                </Button>
                <Button color="primary" onClick={onConfirm}>
                  Chấp nhận
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
