import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking(){
    const queryClient = useQueryClient();
  const { isPending:isDeleting, mutate:DeleteBooking } = useMutation({
    mutationFn:(id)=>deleteBookingApi(id),
    onSuccess: () => {
      toast.success("record deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
return {isDeleting,DeleteBooking};
}