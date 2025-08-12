import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agents-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
// NewAgentDialog functional component.
// This component displays a dialog for creating a new agent.
// It uses the ResponsiveDialog component internally.
export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  return (
    <>
      <ResponsiveDialog
        title="New Agent"
        description="Create a new agent"
        open={open}
        onOpenChange={onOpenChange}
      >
        <AgentForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </ResponsiveDialog>
    </>
  );
};
