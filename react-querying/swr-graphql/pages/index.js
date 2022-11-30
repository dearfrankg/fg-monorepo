import useSWR from "swr";

const fetcher = (query) => {
  return fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);
};

export default function Index() {
  const { data, error } = useSWR("{ users { name } }", fetcher);

  const show = {
    error: error,
    loading: !data,
  };

  if (show.error) {
    return <div>Failed to load</div>;
  }

  if (show.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.users.map((user, i) => (
        <div key={i}>{user.name}</div>
      ))}
    </div>
  );
}
