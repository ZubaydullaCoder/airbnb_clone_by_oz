"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../global/Avatar";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useClickOutside } from "@/utils/useClickOutside";
import useLoginModal from "@/hooks/useLoginModal";
// import { useSession } from "next-auth/react";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import useRentModal from "@/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  // const { data: session, status } = useSession();
  const rentModal = useRentModal();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRentOpen = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, closeDropdown);
  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRentOpen}
          className="hidden md:block text-base font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onclick={() => {}} label="My trips" />
                <MenuItem onclick={() => {}} label="My favorites" />
                <MenuItem onclick={() => {}} label="My reservations" />
                <MenuItem onclick={() => {}} label="My properties" />
                <MenuItem onclick={onRentOpen} label="Airbnb my home" />
                <MenuItem onclick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onclick={() => {
                    loginModal.onOpen();
                    toggleOpen();
                  }}
                  label="Login"
                />
                <MenuItem
                  onclick={() => {
                    registerModal.onOpen();
                    toggleOpen();
                  }}
                  label="Sign Up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
