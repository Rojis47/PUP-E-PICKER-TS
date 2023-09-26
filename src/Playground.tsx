import { FunctionalSection } from "./Functional/FunctionalSection";
import { DogCard } from "./Shared/DogCard";
import { Requests } from "./api";
import { Dog } from "./types";
import React, { useState, useEffect } from "react";

export const Playground = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    Requests.getAllDogs().then((dogs) => {
      setDogs(dogs);
    });
  }, []);

  return (
    <div>
      <h1>Functions Playground</h1>;
      {/* make a function that displays all facorite dogs from /dogs */}
      {dogs &&
        dogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => {
              alert("clicked trash");
            }}
            onHeartClick={() => {
              alert("clicked heart");
            }}
            onEmptyHeartClick={() => {
              alert("clicked empty heart");
            }}
            isLoading={false}
          />
        ))}{" "}
    </div>
  );
};
