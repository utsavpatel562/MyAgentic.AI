import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";

// Custom hook `useConfirm` provides a reusable confirmation dialog mechanism
export const useConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] => {
  /**
   * State to store the current promise resolver.
   * - When `setPromise` is called, the dialog will open.
   * - The promise will be resolved with `true` (confirmed) or `false` (cancelled).
   */

  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  /**
   * Function to trigger the confirmation dialog.
   * Returns a promise that resolves when user clicks Confirm or Cancel.
   */

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  /** Close the dialog and reset state */
  const handleClose = () => {
    setPromise(null);
  };

  /** Handle Confirm action → resolve promise with `true` */
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  /** Handle Cancel action → resolve promise with `false` */
  const handleCancle = () => {
    promise?.resolve(false);
    handleClose();
  };

  /**
   * Dialog component shown when confirm() is triggered.
   * Uses `ResponsiveDialog` and includes Confirm/Cancel buttons.
   */

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      open={promise != null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
        <Button
          onClick={handleCancle}
          variant={"outline"}
          className="w-full lg:w-auto"
        >
          Cancle
        </Button>
        <Button onClick={handleConfirm} className="w-full lg:w-auto">
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  /**
   * Return a tuple:
   * 1. `ConfirmationDialog` component (must be rendered in JSX)
   * 2. `confirm` function (to trigger the dialog and await user response)
   */

  return [ConfirmationDialog, confirm];
};
