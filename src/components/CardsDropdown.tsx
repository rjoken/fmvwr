import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Card from "../Card";
import styles from "./CardsDropdown.module.css";

interface Props {
  cards: Card[];
  onSelectItem: (item: number) => void;
}

function CardsDropdown({ cards, onSelectItem }: Props) {
  /* state variable for search query string entered into textbox */
  const [searchTerm, setSearchTerm] = useState<string>("");

  /* When a card is selected from the dropdown */
  const handleDropdownSelect = (item: number) => {
    onSelectItem(item);
  };

  /* cards list filtered by search query */
  const filteredOptions = cards.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Dropdown onSelect={(eventKey) => handleDropdownSelect(Number(eventKey))}>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className={styles.dropButton}
        >
          {"Select a card..."}
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.menu_scroll}>
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
          {filteredOptions.map((item) => (
            <Dropdown.Item key={item.id} eventKey={item.id}>
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default CardsDropdown;
