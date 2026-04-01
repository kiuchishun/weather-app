import { useState } from "react";

type Props = {
  search: (city: string) => Promise<void>;
};

export default function SearchForm({ search }: Props) {
  const [inputCity, setInputCity] = useState<string>("");
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputCity.trim() !== "") {
      await search(inputCity);
      setInputCity("");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        ></input>
        <button>検索</button>
      </form>
    </>
  );
}
