"use client";
import { IoMdClose } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../global/Button";
import { useClickOutside } from "@/helpers/useClickOutside";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return null;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const closeModalOutside = () => {
    if (disabled) {
      return null;
    }
    onClose();
  };

  useClickOutside(modalRef, closeModalOutside);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return null;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
      flex 
      items-center 
      justify-center 
      overflow-x-hidden 
      overflow-y-auto 
      fixed 
      inset-0
       z-50 
       outline-none
        focus:outline-none
         bg-neutral-800/70"
      >
        <div
          ref={modalRef}
          className="
        relative
         w-full 
         md:w-4/6 
         lg:w-3/6
          xl:w-2/5 
          my-6 
          mx-auto
           h-full 
           lg:h-auto 
           md:h-auto"
        >
          {/* Content */}
          <div
            className={`
            duration-300
            h-full 
            ${showModal ? "translate-y-0" : "translate-y-full"}  
            ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className="
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
            >
              {/*header start*/}
              <div
                className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div
                  className="
                text-lg
                 font-semibold"
                >
                  {title}
                </div>
              </div>
              {/*header end*/}
              {/*body start*/}
              <div className="relative p-6 flex-auto">{body}</div>
              {/*body end*/}
              {/*footer start*/}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label="Back"
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
              {/*footer ends*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
