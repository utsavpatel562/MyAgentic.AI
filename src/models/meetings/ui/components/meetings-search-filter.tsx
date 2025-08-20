import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { useMeetingsFilters } from "../../hooks/use-meeting-filter";
const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <>
      <div className="relative">
        <Input
          placeholder="Filter by Name"
          className="h-9 bg-white w-[200px] pl-7"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
        <CiSearch className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>
    </>
  );
};

export default MeetingsSearchFilter;
