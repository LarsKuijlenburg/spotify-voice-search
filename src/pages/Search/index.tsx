import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { search } from "../../api/queries";
import SearchResultItem from "../../components/SearchResultItem";
import SpeechRecogniser from "../../components/SpeechRecogniser";
import { useAuth } from "../../context/useAuth";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { tokens } = useAuth();

  const { data, isLoading, error } = useQuery(
    ["search", debouncedQuery, tokens?.accessToken],
    () => search(debouncedQuery, tokens?.accessToken || ""),
    {
      enabled:
        !!tokens?.accessToken && !!debouncedQuery && debouncedQuery.length > 0,
    }
  );

  const onSpeechRecognised = (text: string) => {
    setQuery(text);
  };

  return (
    <div>
      Search Page
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <SpeechRecogniser onSpeechEnd={onSpeechRecognised} />
      <h2>Albums</h2>
      {data &&
        data.albums.items.map((album: any) => (
          <SearchResultItem
            image={album.images[0]?.url || "http://placehold.it/100"}
            title={album.name}
            subTitle={album.artists[0].name}
          />
        ))}
      <h2>Artists</h2>
      {data &&
        data.artists.items.map((artist: any) => (
          <SearchResultItem
            image={artist.images[0]?.url || "http://placehold.it/100"}
            title={artist.name}
          />
        ))}
      <h2>Tracks</h2>
      {data &&
        data.tracks.items.map((track: any) => (
          <SearchResultItem
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS95l0uNGpf6Iirnh4tHXYQcdjZCJdpjUQVjw&usqp=CAU"
            }
            title={track.name}
            subTitle={track.artists[0].name}
          />
        ))}
    </div>
  );
};

export default Search;
