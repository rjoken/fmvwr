import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Card from "../Card";
import "./CardsDropdown.css";

interface Props {
  cards: Card[];
  onSelectItem: (item: number) => void;
}

function CardsDropdown({ cards, onSelectItem }: Props) {
  let text: string = "Select a card...";

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleDropdownSelect = (item: number) => {
    onSelectItem(item - 1);
  };

  const filteredOptions = cards.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <center>
        <Dropdown
          onSelect={(eventKey) => handleDropdownSelect(Number(eventKey))}
        >
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            className="drop-button"
          >
            {text}
          </Dropdown.Toggle>
          <Dropdown.Menu className="menu-scroll">
            <div className="sticky-top bg-white p-2">
              <input
                type="text"
                className="form-control border-0 border-bottom shadow-none mb-2"
                placeholder="Search..."
                value={searchTerm}
                onInput={(e) =>
                  setSearchTerm((e.target as HTMLInputElement).value)
                }
              />
            </div>
            {filteredOptions.map((item, index) => (
              <Dropdown.Item key={index} eventKey={item.id}>
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </center>
    </>
  );
}

export default CardsDropdown;
