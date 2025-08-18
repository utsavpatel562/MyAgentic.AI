import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agents-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}
// NewAgentDialog functional component.
// This component displays a dialog for creating a new agent.
// It uses the ResponsiveDialog component internally.
export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) => {
  return (
    <>
      <ResponsiveDialog
        title="Edit Agent"
        description="Edit your agent details"
        open={open}
        onOpenChange={onOpenChange}
      >
        <AgentForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
          initialValues={initialValues}
        />
      </ResponsiveDialog>
    </>
  );
};
