/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const RQSuperHeroesPage = () => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  // const onSuccess = (data) => {
  //   console.log({ data });
  // };

  // const onError = (error) => {
  //   console.log({ error });
  // };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    ["super-heros"],
    () => {
      return axios.get("http://localhost:4000/superheroes");
    },
    {
      // cacheTime: 0,
      // staleTime: 0,
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: false,
      // enabled: false,
      // onSuccess: onSuccess,
      // onError: onError,
      // retry: 2,
      // retryDelay: 2000,
      // select: (data) => {
      //   const superHeroNames = data.data.map((hero) => hero.name);
      //   return superHeroNames;
      // },
    }
  );

  // console.log(data);
  const addSuperHero = (hero) => {
    return axios.post("http://localhost:4000/superheroes", hero); //hero is post data object
  };
  const { mutate: addHero, isLoading: isAdding } = useMutation(addSuperHero, {
    onSuccess: (data) => {
      // Invalidate the "super-heros" query to trigger a refetch and update the UI
      queryClient.invalidateQueries("super-heros");
    },
  });

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    // console.log(hero);
    addHero(hero);
    setName("");
    setAlterEgo("");
  };

  // console.log({ isFetching, isLoading });
  if (isLoading) {
    return <h2>looooaaading ...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  console.log(data);
  return (
    <>
      <h2>heroooes</h2>

      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={refetch}>refetch</button>
        <button onClick={handleAddHeroClick} disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Hero"}
        </button>
      </div>
      {data?.data.map((hero) => {
        return <h3 key={hero.name}>{hero.name}</h3>;
      })}
      {/* {data.map((hero) => {
        return <h3 key={hero.name}>{hero.name}</h3>;
      })} */}
    </>
  );
};

export default RQSuperHeroesPage;
