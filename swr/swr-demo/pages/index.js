import useSwr from "swr";
import Link from "next/link";
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const resources = {
  fetcher: (url) =>
    fetch(url).then(async (res) => {
      await delay(1000);
      return res.json();
    }),

  components: {
    Error: ({ isError }) => {
      if (!isError) {
        return null;
      }

      return <div>Failed to load users</div>;
    },

    Loading: ({ isLoading }) => {
      if (!isLoading) {
        return null;
      }

      return <div>Loading...</div>;
    },

    UserList: ({ users }) => {
      if (!users) {
        return null;
      }

      if (!users.length) {
        return <h3>No users in list</h3>;
      }

      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link href="/users/[id]" as={`/users/${user.id}`}>
                <a>{`User ${user.id}`}</a>
              </Link>
            </li>
          ))}
        </ul>
      );
    },
  },
};

const { fetcher } = resources;
const { Error, Loading, UserList } = resources.components;

export default function Index() {
  const { data, error } = useSwr("/api/users", fetcher);

  const componentProps = {
    isError: error,
    isLoading: !error && !data,
    users: data,
  };

  return (
    <>
      <Error {...componentProps} />

      <Loading {...componentProps} />

      <UserList {...componentProps} />
    </>
  );
}
