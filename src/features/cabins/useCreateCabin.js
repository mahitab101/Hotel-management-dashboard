import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin(){
const queryClient = useQueryClient();
const { isPending: isSaving, mutate: CreateNewCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });
    },
    onError: (error) => toast.error(error.message)
  })
return {isSaving,CreateNewCabin};
}