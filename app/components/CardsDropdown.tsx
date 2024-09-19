import React, { useEffect, useRef, useState } from "react";
import { Card } from "../class/Card";

interface Props {
  cards: Card[];
  onSelectItem: (item: number) => void;
}

const CardsDropdown = ({ cards, onSelectItem }: Props) => {
  /* state variable for search query string entered into textbox */
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* When a card is selected from the dropdown */
  const handleDropdownSelect = (item: number): void => {
    onSelectItem(item);
    toggleDropdown();
  };

  /* cards list filtered by search query */
  const filteredOptions: Card[] = cards.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdown-button"
        className="flex justify-between items-center text-white bg-blue-500 hover:bg-blue-600 border-none font-bold px-5 py-2.5 text-center w-80 cursor-pointer"
        type="button"
        onClick={() => toggleDropdown()}
      >
        Select a card...{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 ${
          isDropdownOpen ? "" : "hidden"
        }`}
      >
        <div className="">
          <input
            type="text"
            className="block w-72 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none"
            placeholder="Search..."
            value={searchTerm}
            onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          />
        </div>
        <ul className="px-4 w-72 text-sm text-gray-700 h-60 overflow-auto">
          {filteredOptions.map((item) => (
            <li
              className="block py-2 hover:bg-gray-100 text-sm cursor-pointer"
              key={item.id}
              onClick={() => handleDropdownSelect(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardsDropdown;
