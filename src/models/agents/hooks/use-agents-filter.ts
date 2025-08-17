import { DEFAULT_PAGE } from '@/constants';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

// Custom hook for managing agent list filters via query parameters
export const useAgentFilters  = () => {
    return useQueryStates({
        // "search" filter: keeps track of the search keyword in query params
        search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
        // "page" filter: keeps track of current pagination page in query params
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
    })
}