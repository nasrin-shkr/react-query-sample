import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const ParallelQueriesPage = () => {
  const { data: friends } = useQuery(["friends"], fetchFriends);
  const { data: superHeroes } = useQuery(["super-heroes"], fetchSuperHeroes);
  // console.log(superHeroes, friends);
  return (
    <div>
      Parallel Queries
      <div style={{ display: "flex", alignItems: "stretch" }}>
        <div
          style={{
            flexBasis: "50%",
            backgroundColor: "#f2f2f2",
            padding: "20px",
          }}
        >
          {superHeroes?.data.map((superHeroe) => {
            return <div key={superHeroe.name}>{superHeroe.name}</div>;
          })}
        </div>
        <div
          style={{ width: "1px", backgroundColor: "#ddd", margin: "0 20px" }}
        ></div>
        <div
          style={{
            flexBasis: "50%",
            backgroundColor: "#e6e6e6",
            padding: "20px",
          }}
        >
          {friends?.data.map((friend) => {
            return <div key={friend.name}>{friend.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ParallelQueriesPage;
