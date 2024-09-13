import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser(){
    const queryClient = useQueryClient();

    const {isPending: isUpdating, mutate: updateUser } = useMutation({
        mutationFn:updateCurrentUser,
        onSuccess: ({user}) => {
            toast.success("User account updated successfully");
            queryClient.setQueryData("user",user)
            queryClient.invalidateQueries({
              queryKey: ['user']
            });
        },
        onError:(error)=>{
          toast.error(error.message)
        }
    });

    return {isUpdating, updateUser }
}