import { fetchSong, generateAiImage } from "@/api";
import { Loading } from "@/components/Loading";
import { Lyrics } from "@/components/Lyrics";
import { Results } from "@/components/Result";
import { SongCard } from "@/components/SongCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Song } from "@/types";
import { Sparkles, XIcon } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import { useToImage } from "@hcorta/react-to-image";
import { ChooseArtStyle } from "@/components/ChooseStyle";
import { AI_STYLES } from "@/config/styles";

export const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [data, setData] = useState<Song[] | null>(null);
  const [results, setResults] = useState<string>();

  const [selectedLines, setSelectedLines] = useState<
    {
      line: string;
      time: number;
    }[]
  >([]);

  const [value] = useDebounce(searchValue, 1000);
  const { isFetching } = useQuery(
    ["search", value],
    async () => fetchSong(value),
    {
      enabled: !!searchValue,
      retryDelay: 5000,
      onSuccess: (data) => {
        setData(data);
      },
    }
  );

  const { isLoading, mutate } = useMutation({
    mutationFn: generateAiImage,
    onSuccess: (data) => {
      setResults(data.data[0].url || "");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleGenerate = () => {
    const formattedLines = selectedLines.map((line) => line.line).join("\n");
    const style = AI_STYLES[selectedStyle || ""];
    const prompt = style.prompt.replace(/\[line_here\]/g, formattedLines);
    mutate(prompt);
  };

  const { ref, isLoading: isLoadingImage, getPng } = useToImage();

  const handleRestart = () => {
    setSelectedSong(null);
    setSearchValue("");
    setData(null);
    setSelectedLines([]);
    setResults("");
    setSelectedStyle(null);
  };
  return (
    <div className="bg-background p-10 flex min-h-screen flex-col items-center justify-center">
      <div className="bg-transparent space-y-5 p-7 rounded-lg">
        <div>
          <h1 className="text-2xl text-foreground font-semibold">
            Lyrics Image Gen Expirement
          </h1>
          <p className="text-muted-foreground">
            This is just a simple experiment to see if this project is vaiable.
          </p>
          {selectedSong && !selectedStyle && (
            <ChooseArtStyle setSelectedStyle={setSelectedStyle} />
          )}
          {results && selectedSong ? (
            <div className="mt-5 space-y-3">
              <div className="flex space-x-2">
                <Button
                  disabled={isLoadingImage}
                  onClick={() => {
                    getPng();
                  }}
                  variant={"secondary"}
                >
                  Download Image
                </Button>
                <Button onClick={handleRestart} variant={"outline"}>
                  Try Again
                </Button>
              </div>
              <Results
                lyrics={selectedLines.map((line) => line.line).join("\n")}
                ref={ref}
                song={selectedSong}
                aiImage={results}
              />
            </div>
          ) : (
            <>
              {/* {selectedSong && <Results song={selectedSong} />} */}
              {isLoading && <Loading />}
              <div className="mt-2 space-y-2">
                {!selectedSong && (
                  <>
                    <Input
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search for a song"
                      value={searchValue}
                    />
                    <div className="!mt-3">
                      {isFetching && "Loading..."}
                      {!isFetching && data?.length ? (
                        <p className="text-muted-foreground mb-2">
                          Search results:
                        </p>
                      ) : null}
                      {data?.length && (
                        <div className="grid gap-5 grid-cols-2">
                          {data.map((song) => (
                            <SongCard
                              onClick={() => setSelectedSong(song)}
                              data={song}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {selectedSong && selectedStyle && (
                  <iframe
                    style={{ borderRadius: "10px" }}
                    src={`https://open.spotify.com/embed/track/${selectedSong.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )}
                {selectedSong && selectedStyle && (
                  <Lyrics
                    selectedLines={selectedLines}
                    setSelectedLines={setSelectedLines}
                    data={selectedSong}
                  />
                )}

                {selectedSong && selectedStyle && (
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={handleGenerate}
                      variant={"secondary"}
                      disabled={isLoading}
                      className="space-x-1"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Generate</span>
                    </Button>
                    <Button
                      onClick={handleRestart}
                      className="space-x-1"
                      variant={"outline"}
                    >
                      <XIcon className="w-5 h-5" />
                      <p>Clear</p>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
