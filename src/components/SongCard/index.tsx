import { Song } from "@/types";
import clsx from "clsx";

interface SongCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Song;
  selected?: boolean;
}
export const SongCard = ({ data, selected, ...props }: SongCardProps) => {
  return (
    <div
      {...props}
      className={clsx(
        "flex cursor-pointer border rounded-sm border-border items-start space-x-3",
        selected && "border-ring"
      )}
    >
      <div className="w-[70px] overflow-hidden rounded-md h-[70px]">
        <img
          src={data.cover}
          className="w-full h-full object-cover object-center"
          alt={data.title}
        />
      </div>
      <div className="mt-2">
        <h1
          title={data.title}
          className="text-lg text-foreground font-semibold truncate md:text-clip max-w-[150px] inline-flex overflow-hidden "
        >
          {data.title}
        </h1>
        <p className="text-muted-foreground">{data.artist}</p>
      </div>
    </div>
  );
};
