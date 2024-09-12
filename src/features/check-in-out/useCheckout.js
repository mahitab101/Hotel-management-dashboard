import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: ischeckingOut, mutate: checkoutFun } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking no #${data.id} successfully checked out`),
        queryClient.invalidateQueries({ active: true })
    },
    onError: () => toast.error("error accure while check in"),
  });
  return { ischeckingOut, checkoutFun };
}
