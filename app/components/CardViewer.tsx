"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import CardsDropdown from "./CardsDropdown";
import CardDisplay from "./CardDisplay";

const CardViewer: React.FC = () => {
  const { data: cards } = useData();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // get "card" url parameter
  const params = new URLSearchParams(searchParams.toString());
  const defaultId = Number(params.get("card"));

  // if defaultId is a valid key of cards dictionary, use it, otherwise 1
  const [selectedItem, setSelectedItem] = useState<number>(defaultId);

  // update card id in url when selectedItem is changed
  useEffect(() => {
    if (selectedItem in cards) {
      params.set("card", String(cards[selectedItem].id));
      router.push(pathname + "?card=" + params.get("card"));
    }
  }, [selectedItem]);

  return (
    <>
      <div className="m-10 flex flex-col text-center items-center">
        <h1>Card Viewer</h1>
        {Object.keys(cards).length > 0 ? (
          <>
            <CardsDropdown
              cards={Object.values(cards)}
              onSelectItem={(item) => setSelectedItem(cards[item].id)}
            />
            <CardDisplay selectedItem={cards[selectedItem]} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default CardViewer;
