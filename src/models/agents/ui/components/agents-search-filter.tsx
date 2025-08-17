import { Input } from "@/components/ui/input";
import { useAgentFilters } from "../../hooks/use-agents-filter";
import { CiSearch } from "react-icons/ci";
const AgentsSearchFilter = () => {
  const [filters, setFilters] = useAgentFilters();
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

export default AgentsSearchFilter;
