// import Thumbnail from "../components/Thumbnail";
import type { NextPage, GetStaticProps } from "next";
import { IPost } from "../types/post";
import Link from "next/link";
import { getAllPosts } from "../utils/mdxUtils";
import { Table } from "antd";
import dayjs from "dayjs";
import relativeTIme from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTIme);

// props type
type Props = {
  posts: [IPost];
};

// component render function
const Home: NextPage<Props> = ({ posts }: Props) => {
  const createTableData = () => {
    const dataSource = posts.map((post, index) => {
      return {
        key: index.toString(),
        date: <div className="whitespace-nowrap">{dayjs(post.date).fromNow()}</div>,
        title: (
          <Link href={`/posts/${post.slug}`}>
            <a className="whitespace-nowrap">{post.title}</a>
          </Link>
        ),
        description: post.description,
      };
    });

    const columns = [
      {
        title: "When",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ];

    return {
      dataSource,
      columns,
    };
  };

  const table = createTableData();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Technical articles</h1>
      <Table dataSource={table.dataSource} columns={table.columns} />
      {/* <div className="space-y-12">
        {posts.map((post) => (
          <div key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>

            <p>{post.date}</p>
            <p>{post.description}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Home;

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(["title", "slug", "date", "description", "thumbnail"]);

  // retunr the posts props
  return { props: { posts } };
};
