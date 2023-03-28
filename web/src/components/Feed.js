import React from "react";
import { useState, useEffect } from "react";
import Login from "./Login";
const Feed = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  // const name = "you";

  const query = `query Byebye($name: String!) {
    byebye(name: $name)
  }`;

  useEffect(() => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { name: "you" },
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .then(() => {
        console.log(items);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Login />
      // <div>{items.data.byebye}</div>
      // <ul>
      //   {items.map((item) => (
      //     <li key={item.id}>
      //       {item.name} {item.price}
      //     </li>
      //   ))}
      // </ul>
    );
  }
};

export default Feed;
