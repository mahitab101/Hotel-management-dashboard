import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting(){
    const queryClient = useQueryClient();
    const { isPending: isLoading, mutate: updateSetting } = useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success("Row updated successfully");
        queryClient.invalidateQueries({
          queryKey: ['settings']
        });
      },
      onError: (error) => toast.error(error.message)
    })
    return {isLoading,updateSetting}
}