import React, { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";

export type FunctionalSectionProps = {
  children: ReactNode;
  dogs: Dog[];
  activeSelector: string;
  setActiveSelector: React.Dispatch<React.SetStateAction<string>>;
};

export const FunctionalSection = ({
  children,
  dogs,
  activeSelector,
  setActiveSelector,
}: FunctionalSectionProps) => {
  const favoriteDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoriteDogs = dogs.filter((dog) => !dog.isFavorite);

  const Selector = ({
    label,
    selectorType,
  }: {
    label: string;
    selectorType: string;
  }) => (
    <div
      className={`selector ${activeSelector === selectorType ? "active" : ""}`}
      onClick={() =>
        setActiveSelector(
          activeSelector === selectorType ? "all" : selectorType
        )
      }
    >
      {label}
      {(selectorType === "favorite" || selectorType === "unfavorite") &&
        (selectorType === "favorite"
          ? favoriteDogs.length
          : unfavoriteDogs.length)}
    </div>
  );

  const selectors = [
    { label: "favorites", selectorType: "favorite" },
    { label: "unfavorite", selectorType: "unfavorite" },
    { label: "create dog", selectorType: "create" },
  ];

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {selectors.map(({ label, selectorType }) => (
            <Selector
              key={selectorType}
              label={label}
              selectorType={selectorType}
            />
          ))}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
