import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "@/models/agents/ui/components/agents-form";
import { useRouter } from "next/navigation";
import { MeetingForm } from "./meetings-form";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
// NewAgentDialog functional component.
// This component displays a dialog for creating a new agent.
// It uses the ResponsiveDialog component internally.
export const NewMeetingDialog = ({
  open,
  onOpenChange,
}: NewMeetingDialogProps) => {
  const router = useRouter();

  return (
    <>
      <ResponsiveDialog
        title="New Meeting"
        description="Create a new meeting"
        open={open}
        onOpenChange={onOpenChange}
      >
        <MeetingForm
          onSuccess={(id) => {
            onOpenChange(false);
            router.push(`/meetings/${id}`);
          }}
          onCancel={() => onOpenChange}
        />
      </ResponsiveDialog>
    </>
  );
};
