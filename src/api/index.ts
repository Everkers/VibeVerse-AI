import { Song } from "@/types";
import { Lyrics } from "@/types/lyrics";
import OpenAI from "openai";

const BASE_URL = "https://api.spotify.com/v1/search";
const LYRICS_BASE_URL = `https://spotify-scraper.p.rapidapi.com/v1/track/lyrics`;

export const fetchSong = async (name: string): Promise<Song[]> => {
  const url = `${BASE_URL}?q=${name}&type=track&limit=10`;
  const headers = new Headers();
  headers.append(
    "Authorization",
    `Bearer${import.meta.env.VITE_SPOTIFY_API_KEY as string}`
  );
  const data = await fetch(url, {
    headers,
  });

  const response = await data.json();
  const formatData = response.tracks?.items?.map((item: any) => {
    return {
      id: item.id,
      title: item.name,
      url: item.external_urls.spotify,
      artist: item.artists[0].name,
      cover: item.album.images[0].url,
      preview: item.preview_url,
    };
  });
  return formatData;
};

export const fetchSongLyrics = async (url: string): Promise<Lyrics[]> => {
  const lyricsURL = `${LYRICS_BASE_URL}?trackId=${url}&format=json`;
  const headers = new Headers();
  headers.append(
    "X-RapidAPI-Key",
    import.meta.env.VITE_RAPID_API_KEY as string
  );
  headers.append("X-RapidAPI-Host", "spotify-scraper.p.rapidapi.com");
  const data = await fetch(lyricsURL, {
    headers,
  });
  const response = await data.json();
  return response;
};

export const generateAiImage = async (prompt: string) => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_GPT_API_KEY as string,
    dangerouslyAllowBrowser: true,
  });

  const image = await openai.images.generate({
    model: "dall-e-3",
    quality: "hd",
    prompt,
    n: 1,
    style: "vivid",
  });
  return image;
};
