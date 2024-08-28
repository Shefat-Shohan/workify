"use client";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent } from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  function onDismiss() {
    router.back();
  }
  return (
    <Drawer open={true} onClose={onDismiss}>
      <DrawerContent className="h-[90%]">
        <ScrollArea>
          {children}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

{
  /* <div className="modal">
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
      </div> */
}
