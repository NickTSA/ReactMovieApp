import React, { useState } from "react";

export default function SearchBar(props) {
  const [userInput, setUserInput] = useState("");

  const text = (e) => {
    setUserInput(e.target.value);
  };

  function submit(e) {
    e.preventDefault();
    props.handleSearch(userInput);
    setUserInput("");
  }

  return (
    <>
      <form
        className="searchContainer"
        autoComplete="off"
        onSubmit={(e) => submit(e)}
      >
        <div>
          <input
            className="searchinput"
            type="text"
            name="search"
            placeholder="Search Movie..."
            onChange={text}
            value={userInput}
          />
        </div>
      </form>
    </>
  );
}
