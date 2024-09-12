import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {

    const {isPendeng,data:user} = useQuery({
        queryKey:["user"],
        queryFn:getCurrentUser,
    });
    return {isPendeng, user, isAuthenticated: user?.role === "authenticated" };
}