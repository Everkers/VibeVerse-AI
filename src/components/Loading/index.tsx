import { useEffect, useState } from "react";

const DEFAULT_LOADING_STATE = {
  message: "I just hope the result is worth the wait",
  gif: "/Male_wait.gif",
};
export const Loading = () => {
  const [loadingStats, setLoadingStats] = useState([
    {
      message: "I'm waiting for the server to respond",
      gif: "/Male_wait.gif",
    },
    {
      message: "I hope it doesn't take too long",
      gif: "/Male_talk.gif",
    },
    {
      message: "I'm getting bored",
      gif: "/Male_walk.gif",
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStats((prev) => {
        if (prev.length === 1) {
          return [DEFAULT_LOADING_STATE];
        }
        return prev.slice(1);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute z-50 items-center justify-center flex w-full h-screen bg-background inset-0">
      <div className="flex flex-col items-center">
        <img
          src={loadingStats[0].gif || DEFAULT_LOADING_STATE.gif}
          className="w-50 h-50"
        />
        <p className="-mt-10 text-md rounded-md bg-muted px-4 py-3 text-muted-foreground">
          {loadingStats[0].message || DEFAULT_LOADING_STATE.message}...
        </p>
      </div>
    </div>
  );
};
