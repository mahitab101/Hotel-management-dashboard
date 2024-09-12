import { useMutation } from "@tanstack/react-query";
import { signup as apiSignup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isPending: isLoading, mutate: signup } = useMutation({
    mutationFn: apiSignup,
    onSuccess: (user) => {
        console.log(user);
        toast.success("Account crated successfully! please verfy the new account from the user's email address")
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {  isLoading, signup };
}
