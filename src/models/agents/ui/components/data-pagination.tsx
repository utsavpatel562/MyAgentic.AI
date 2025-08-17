import { Button } from "@/components/ui/button";
import { GoChevronRight } from "react-icons/go";
import { GoChevronLeft } from "react-icons/go";
interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {page} of {totalPages || 1}
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            className=""
            variant={"outline"}
            size={"sm"}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <GoChevronLeft />
            Previous
          </Button>
          <Button
            className=""
            variant={"outline"}
            size={"sm"}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
            <GoChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
};
