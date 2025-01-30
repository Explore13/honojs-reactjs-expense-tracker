import { Button } from "@/components/ui/button";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: About,
});

function About() {
  const { isPending, error, data } = useQuery(userQueryOptions);
  if (error) return "not logged in";
  if (isPending) return "loading...";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="p-6 rounded-lg border-2 shadow-md w-full max-w-md">
        <div className="w-full flex justify-center">
          <img
            src={data?.user?.picture || "/src/assets/user_profile.png"}
            referrerPolicy="no-referrer"
            alt="profile picture"
            className="rounded-full w-20 h-20 mb-2"
          />
        </div>

        <p className="text-3xl text-center font-bold mb-2">
          {data?.user?.given_name + " " + data?.user?.family_name}
        </p>
        <p className="text-xs text-center mb-4">{data?.user?.email}</p>
        <div className="w-full flex justify-center">
          <Button>
            <a href="/api/logout">Logout!</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
