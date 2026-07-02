import { QueryClient, defaultShouldDehydrateQuery } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Dữ liệu cũ sau 1 phút
        refetchOnWindowFocus: false, // Tránh refetch không cần thiết
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: Luôn tạo client mới cho mỗi request
    return makeQueryClient();
  } else {
    // Client/Browser: Tái sử dụng client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
