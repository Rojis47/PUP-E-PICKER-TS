import { useState, useCallback } from "react";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [activeSelector, setActiveSelector] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchDogs = useCallback(() => {
    Requests.getAllDogs().then(setDogs);
  }, [setDogs]);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        activeSelector={activeSelector}
        setActiveSelector={setActiveSelector}
        dogs={dogs}
      >
        {activeSelector === "create" && (
          <FunctionalCreateDogForm
            refetchDogs={refetchDogs}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        {activeSelector !== "create" && (
          <FunctionalDogs
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            refetchDogs={refetchDogs}
            dogs={dogs}
            activeSelector={activeSelector}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
