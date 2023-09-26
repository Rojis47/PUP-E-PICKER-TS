import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> => {
    return fetch(baseUrl + "/dogs").then((res) => res.json());
  },

  postDog: ({ dog }: { dog: Omit<Dog, "id"> }) => {
    return fetch(baseUrl + "/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dog),
    }).then((res) => res.json());
  },

  deleteDog: (id: number) => {
    return fetch(baseUrl + `/dogs/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

  updateDog: ({ id, dog }: { id: number; dog: Partial<Dog> }) => {
    return fetch(baseUrl + `/dogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dog),
    }).then((res) => res.json());
  },

  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
