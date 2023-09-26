import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { useEffect, useCallback } from "react";
import { Requests } from "../api";

export type FunctionalDogProps = {
  dogs: Dog[];
  activeSelector: string;
  refetchDogs: () => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FunctionalDogs = ({
  dogs,
  activeSelector,
  refetchDogs,
  isLoading,
  setIsLoading,
}: FunctionalDogProps) => {
  useEffect(() => {
    refetchDogs();
  }, [refetchDogs]);

  const updateDogFavoriteStatus = useCallback(
    (id: number, isFavorite: boolean) => {
      setIsLoading(true);
      Requests.updateDog({ id, dog: { isFavorite } })
        .then(refetchDogs)
        .finally(() => setIsLoading(false));
    },
    [refetchDogs]
  );

  const removeDog = useCallback(
    (id: number) => {
      setIsLoading(true);
      Requests.deleteDog(id)
        .then(refetchDogs)
        .finally(() => setIsLoading(false));
    },
    [refetchDogs]
  );

  let filteredDogs = dogs;
  if (activeSelector === "favorite") {
    filteredDogs = dogs.filter((dog) => dog.isFavorite);
  } else if (activeSelector === "unfavorite") {
    filteredDogs = dogs.filter((dog) => !dog.isFavorite);
  }

  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          isLoading={isLoading}
          dog={dog}
          key={dog.id}
          onTrashIconClick={() => removeDog(dog.id)}
          onHeartClick={() => updateDogFavoriteStatus(dog.id, false)}
          onEmptyHeartClick={() => updateDogFavoriteStatus(dog.id, true)}
        />
      ))}
    </>
  );
};
