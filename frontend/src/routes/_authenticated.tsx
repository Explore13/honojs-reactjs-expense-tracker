import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/api";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="p-6 w-full max-w-md">
        <p className="text-2xl text-center mb-4">You are not logged in.</p>
        <div className="w-full flex justify-center">
          <Button>
            <a href="/api/login">Login!</a>
          </Button>
        </div>
      </div>
    </div>
  );
};
const Component = () => {
  const { user } = Route.useRouteContext();
  if (!user) {
    return <Login />;
  }

  return <Outlet />;
};
// src/routes/_authenticated.tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    try {
      const queryClient = context.queryClient;
      // const data = await queryClient.fetchQuery(userQueryOptions);
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (error) {
      console.log(error);
      return { user: null };
    }
  },
  component: Component,
});
