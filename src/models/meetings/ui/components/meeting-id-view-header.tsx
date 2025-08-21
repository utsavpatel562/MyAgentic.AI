import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";

interface Props {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}
export const MeetingIdViewHeader = ({
  meetingId,
  meetingName,
  onEdit,
  onRemove,
}: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="font-medium text-lg">
                <Link href={"/meetings"}>My Meetings</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
              <FaAngleRight className="text-muted-foreground" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="font-medium text-lg text-pink-700"
              >
                <Link href={`/meetings/${meetingId}`}>{meetingName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <SlOptionsVertical className="text-slate-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              <MdOutlineModeEditOutline className="size-4 text-black" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRemove}>
              <IoTrashOutline className="size-4 text-black" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
