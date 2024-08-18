"use client";

import { type ElementRef, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Drawer, DrawerContent } from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }
  return createPortal(
    <div className="fixed inset-0 z-50">
      <div className="modal">
        <motion.dialog
          className="modal_wrapper"
          ref={dialogRef}
          onClose={onDismiss}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          {children}
          <span
            className="cursor-pointer absolute top-2 right-8 z-100"
            onClick={onDismiss}
          >
            <XMarkIcon className="w-6 h-6" />
          </span>
        </motion.dialog>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
