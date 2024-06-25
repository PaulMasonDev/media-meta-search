"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBox = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/search?searchTerm=" + searchTerm);
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          className="rounded-xl p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for a show..."
        />
      </form>
    </div>
  );
};

export default SearchBox;
