// src/hooks/use-personal-account-data.ts
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@kit/supabase/hooks/use-supabase";
function usePersonalAccountData(userId, partialAccount) {
  const client = useSupabase();
  const queryKey = ["account:data", userId];
  const queryFn = async () => {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const response = await client.from("profiles").select(
      `
        id,
        full_name,
        avatar_url
    `
    ).eq("id", userId).single();
    if (response.error) {
      throw response.error;
    }
    return {
      id: response.data.id,
      name: response.data.full_name,
      picture_url: response.data.avatar_url
    };
  };
  return useQuery({
    queryKey,
    queryFn,
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialData: partialAccount?.id ? {
      id: partialAccount.id,
      name: partialAccount.name,
      picture_url: partialAccount.picture_url
    } : void 0
  });
}
function useRevalidatePersonalAccountDataQuery() {
  const queryClient = useQueryClient();
  return useCallback(
    (userId) => queryClient.invalidateQueries({
      queryKey: ["account:data", userId]
    }),
    [queryClient]
  );
}

export {
  usePersonalAccountData,
  useRevalidatePersonalAccountDataQuery
};
