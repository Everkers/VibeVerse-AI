import { Song } from "@/types";
import { forwardRef } from "react";

interface ResultsProps {
  song: Song;
  aiImage: string;
  lyrics: string;
}
export const Results = forwardRef<HTMLDivElement, ResultsProps>(
  ({ song, aiImage, lyrics }, ref) => {
    {
      return (
        <div
          ref={ref}
          className="w-[570px] min-h-[800px] overflow-hidden rounded-2xl grid grid-rows-7"
        >
          <div className="row-span-4 bg-gray-100 text-gray-100 bg-opacity-5 flex items-center justify-center">
            <img
              src={aiImage}
              className="w-full h-full object-cover object-center"
              alt=""
            />
          </div>
          <div className="row-span-3 py-10 bg-black text-white">
            <div className="h-full gap-3 flex items-center px-[20px]">
              <div className="space-y-1 flex-1">
                <p className="text-xs tracking-widest uppercase opacity-80">
                  BY {song.artist}
                </p>
                <h1 className="text-6xl font-image uppercase">{song.title}</h1>
              </div>
              <div className="flex-1">
                <div className="space-y-6">
                  <div className="w-full h-[90px]">
                    <img
                      src={song.cover}
                      className="w-full h-full object-cover object-center"
                      alt=""
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <img src="/clean_shot.png" className="w-full" alt="" />
                      <h3 className="absolute top-1/2 transform text-black font-image tracking-widest left-2 -translate-y-1/2">
                        Lyrics
                      </h3>
                    </div>
                    <p className="text-secondary-foreground">{lyrics}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
