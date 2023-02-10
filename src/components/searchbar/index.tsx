import { StyledInput } from "./styles";

interface Props {
  onQueryChange: (query: string) => void;
  value?: string;
}

const SearchBar = ({ onQueryChange, value }: Props) => {
  return (
    <StyledInput
      value={value}
      onChange={(event) => onQueryChange(event.target.value)}
    />
  );
};

export default SearchBar;
