import { EmptyState } from "@/components/emptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoBanOutline, IoVideocam } from "react-icons/io5";

export const UpcomingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start this meeting, a summary will appear here"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button variant={"secondary"} className="w-full lg:w-auto">
          <IoBanOutline />
          Cancel meeting
        </Button>
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${123}`}>
            <IoVideocam />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
