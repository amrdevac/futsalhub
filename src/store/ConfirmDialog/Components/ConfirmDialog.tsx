"use client";

import dd from "@/utils/dd/dd";
import { useConfirmationStore } from "../useConfirmDialogStore";

export const ConfirmDialog = ({ id }: { id: string }) => {
  const mainStore = useConfirmationStore();
  const btnHandler = (result: boolean) => {
    mainStore.confirmDialogResult(result);
    mainStore.confirmDialogResultHandler(result);
  };
  return (
    <>
      <dialog
        id={id}
        className="modal modal-bottom sm:modal-middle dark:text-white "
      >
        <div className="modal-box bg-white dark:bg-slate-800">
          <h3 className="font-bold text-lg">Konfirmasi</h3>
          <p className="py-4">{mainStore.confirmText}</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button
                className="btn btn-primary text-white"
                onClick={() => btnHandler(true)}
              >
                {mainStore.btnOk}
              </button>
              <button
                className="btn btn-light "
                onClick={() => {
                  const selfModal = document.getElementById(
                    id
                  ) as HTMLDialogElement;
                  if (selfModal) {
                    selfModal.close();
                  }
                }}
              >
                {mainStore.btnCancel}
                </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
