import { fetchSongLyrics } from "@/api";
import { Song } from "@/types";
import { useQuery } from "react-query";
import { Input } from "../ui/input";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export interface LyricsProps {
  data: Song;
  selectedLines: {
    line: string;
    time: number;
  }[];
  setSelectedLines: React.Dispatch<
    React.SetStateAction<
      {
        line: string;
        time: number;
      }[]
    >
  >;
}
export const Lyrics = ({
  data,
  selectedLines,
  setSelectedLines,
}: LyricsProps) => {
  const { data: lyricsData, isFetching } = useQuery(
    ["lyrics", data.id],
    async () => {
      return fetchSongLyrics(data.id);
    },
    {
      enabled: !!data,
    }
  );

  const [isCTRLPressed, setIsCTRLPressed] = useState(false);

  const lineVariant: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
    },
  };

  const handleLineClick = (line: string, time: number) => {
    if (selectedLines.some((l) => l.line === line && l.time === time)) {
      setSelectedLines(selectedLines.filter((l) => l.line !== line));
      return;
    }
    if (isCTRLPressed) {
      setSelectedLines([...selectedLines, { line, time }]);
    } else {
      setSelectedLines([{ line, time }]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsCTRLPressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsCTRLPressed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div>
      <Input
        onChange={(e) => {
          setSelectedLines([{ line: e.target.value, time: 0 }]);
        }}
        placeholder="Type lyrics here..."
      />
      <p className="mt-2 flex items-center space-x-1 text-muted-foreground text-sm">
        <InfoCircledIcon />
        <span>
          You can use the text input to type the lyrics or you can click on the
          lyrics to select them.
        </span>
      </p>

      {isFetching && <p className="capitalize mt-2">Loading...</p>}
      {!lyricsData?.length && (
        <p className="capitalize mt-2 text-muted-foreground">
          We couldn't find the lyrics for this song.
        </p>
      )}

      {lyricsData?.length && (
        <div className="w-full h-[300px] space-y-2 overflow-y-scroll pr-5 overflow-hidden my-5">
          {lyricsData.map((line) => (
            <motion.p
              onClick={() => handleLineClick(line.text, line.startMs)}
              viewport={{ amount: 0.8 }}
              initial="offscreen"
              whileInView="onscreen"
              variants={lineVariant}
              className={clsx(
                "text-2xl select-none font-medium text-foreground cursor-pointer transition-all",
                selectedLines.some(
                  (l) => l.line === line.text && l.time === line.startMs
                ) && "text-primary"
              )}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      )}
      <p className="text-sm mb-2 text-muted-foreground">
        Select a line while holding{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted mx-1.5 text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL</span>
        </kbd>
        to multi-select.
      </p>
    </div>
  );
};
