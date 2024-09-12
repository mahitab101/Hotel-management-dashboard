import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };
  // {field:'totalPrice',value:500,method:"gte"}
  //SORT
  const sortByRow = searchParams.get("SortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //Query
  const {
    isPending,
    error,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE Fetch
  const pageCount = Math.ceil(count/PAGE_SIZE)
  if(page<pageCount){
  queryClient.fetchQuery({
    queryKey: ["bookings", filter, sortBy, page+1],
    queryFn: () => getBookings({ filter, sortBy, page:page+1 }),
  });
}
  if(page>1){
  queryClient.fetchQuery({
    queryKey: ["bookings", filter, sortBy, page-1],
    queryFn: () => getBookings({ filter, sortBy, page:page-1 }),
  });
}

  return { isPending, error, bookings, count };
}
