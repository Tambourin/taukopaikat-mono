import React, { useRef } from "react";
import { Input } from "semantic-ui-react";

const SearchWordInput = ({ searchWord, setSearchWord }) => {
  const ref = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    ref.current.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <form onSubmit={handleSubmit} ref={ref}>
      <label htmlFor="searchWordInput">Hakusana</label>
      <Input
        id="searchWordInput"
        fluid
        icon="search"
        placeholder="Hae nimen tai paikkakunnan perusteella"
        value={searchWord}
        onChange={(event, data) => setSearchWord(data.value)}
      />
    </form>
  );
};

export default SearchWordInput;
