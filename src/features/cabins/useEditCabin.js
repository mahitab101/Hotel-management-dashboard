import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditCabin(){
    const queryClient = useQueryClient();
    const { isPending: isEditing, mutate: EditCabin } = useMutation({
      mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
      onSuccess: () => {
        toast.success("Cabin updated successfully");
        queryClient.invalidateQueries({
          queryKey: ['cabins']
        });
      },
      onError: (error) => toast.error(error.message)
    })
    return {isEditing,EditCabin}
}