import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { search } from "../../api/queries";
import { SearchResponse } from "../../api/types";
import SearchBar from "../../components/SearchBar";
import SearchResultItem from "../../components/SearchResultItem";
import SpeechRecogniser from "../../components/SpeechRecogniser";
import TabView from "../../components/TabView";
import Tab from "../../components/TabView/components/Tab";
import { useAuth } from "../../context/useAuth";
import useDebounce from "../../hooks/useDebounce";
import { Container } from "./styles";

const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { tokens } = useAuth();

  const { data, error, isFetching } = useQuery<SearchResponse>(
    ["search", debouncedQuery, tokens?.accessToken],
    () => search(debouncedQuery, tokens?.accessToken || ""),
    {
      enabled: !!tokens?.accessToken && !!debouncedQuery,
    }
  );

  const onSpeechRecognised = (text: string) => {
    setQuery(text);
  };

  const onQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <div>
      <Container>
        <h2>Spotify (voiced) Search</h2>
        <SearchBar value={query} onQueryChange={onQueryChange} />
        <SpeechRecogniser onSpeechEnd={onSpeechRecognised} />
      </Container>
      {isFetching && <Container>Loading...</Container>}
      {error ? <div>Error: error occured</div> : <></>}
      {!isFetching && !error && data && (
        <TabView>
          <Tab title="Albums" color="#1db954">
            <>
              <h2>Albums</h2>
              {data.albums.items.map((album: any) => (
                <SearchResultItem
                  image={album.images[0]?.url || "http://placehold.it/100"}
                  title={album.name}
                  subTitle={album.artists[0].name}
                  key={album.id}
                />
              ))}
            </>
          </Tab>
          <Tab title="Artists" color="#1db954">
            <>
              <h2>Artists</h2>
              {data.artists.items.map((artist: any) => (
                <SearchResultItem
                  image={artist.images[0]?.url || "http://placehold.it/100"}
                  title={artist.name}
                  key={artist.id}
                />
              ))}
            </>
          </Tab>
          <Tab title="tracks" color="#1db954">
            <>
              <h2>Tracks</h2>
              {data.tracks.items.map((track: any) => (
                <SearchResultItem
                  image={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS95l0uNGpf6Iirnh4tHXYQcdjZCJdpjUQVjw&usqp=CAU"
                  }
                  title={track.name}
                  subTitle={track.artists[0].name}
                  key={track.id}
                />
              ))}
            </>
          </Tab>
        </TabView>
      )}
    </div>
  );
};

export default Search;
