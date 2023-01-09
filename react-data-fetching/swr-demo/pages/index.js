import useSwr from "swr";
import Link from "next/link";

const resources = {
  delay: (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms)),

  randomOneToTen: Math.floor(Math.random() * 10) + 1,

  fetcher: (url) =>
    fetch(url).then(async (res) => {
      await delay(1000);

      if (randomOneToTen > 8) {
        throw error;
      }

      return res.json();
    }),

  components: {
    Header: ({ title }) => (
      <header>
        <h1>{title}</h1>
      </header>
    ),

    Blurb: ({ blurb }) => {
      const lines = blurb.split(/\n\n/);

      return (
        <div style={{ background: "wheat", padding: 30, lineHeight: "2rem" }}>
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      );
    },

    Error: () => <div>Failed to load users</div>,

    Loading: () => <div>Loading...</div>,

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

const { delay, randomOneToTen, fetcher } = resources;
const { Header, Blurb, Error, Loading, UserList } = resources.components;

export default function Index() {
  const { data, error } = useSwr("/api/users", fetcher);

  const show = {
    isError: !!error,
    isLoading: !error && !data,
    isLoaded: !error && data,
  };

  const blurb = `
This is a swr demo.
swr is a data fetching package that makes things more convenient.
In this demo the fetch call is mocked with a one second delay to see the loading message.
Reload the page to randomly see the components (Error, Loading, UserList).

I noticed when I click on a user and hit the back button the old data
is still there and I get no loading notice even though it's loading.
I looked it up online and it says that is expected behavior.

I tried to write a handler to reset data when you navigate away but it did not work.  This seems to be an issue.
`;

  return (
    <main style={{ margin: "auto", maxWidth: 800 }}>
      <Header title={"swr demo"} />

      <Blurb blurb={blurb} />

      <div style={{ padding: 30 }}>
        {show.isError && <Error />}

        {show.isLoading && <Loading />}

        {show.isLoaded && <UserList {...{ users: data }} />}
      </div>
    </main>
  );
}
