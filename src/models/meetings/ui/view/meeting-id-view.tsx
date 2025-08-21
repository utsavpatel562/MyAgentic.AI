"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";

interface Props {
  meetingId: string;
}

// Main component that renders meeting details by ID
export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  // State for toggling "Update Meeting" dialog visibility
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  // Custom confirmation modal for "Remove meeting" action
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  );

  // Fetch meeting details (suspense-enabled query)
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  // Mutation to remove meeting from DB
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        // Invalidate cached list so UI updates after deletion
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
    })
  );

  // Handler for removing a meeting (with confirmation)
  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
};

// Loading state fallback (suspense boundary will show this)
export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a moment"
    />
  );
};

// Error state fallback
export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      description="Something went wrong"
    />
  );
};
