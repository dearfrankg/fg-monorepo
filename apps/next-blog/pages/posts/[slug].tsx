import { serialize } from "next-mdx-remote/serialize";
import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
//---
import { IPost } from "../../types/post";
import { useMdxComponentsContext } from "../../context/mdxContext";
import Thumbnail from "../../components/Thumbnail";
import Prerequisites from "../../components/Prerequisites";
import Stacks from "../../components/Stacks";
import { ParsedUrlQuery } from "querystring";
import { getPost, getAllPosts } from "../../utils/mdxUtils";
//---
import Highlight, { defaultProps } from "prism-react-renderer";
//---
import dayjs from "dayjs";
import relativeTIme from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTIme);

const code = ({ children, className }: { children: any; className: any }) => {
  const language = !!className ? className.replace(/language-/, "") : "text";

  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, margin: "-15px", marginTop: "5px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

// props type
type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IPost, "slug">;
};

// components to render
const components = {
  code,
  Prerequisites,
  Stacks,
};

const PostPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  // get setters
  const { setPrerequisites, setStacks } = useMdxComponentsContext();

  useEffect(() => {
    // set prerequisites
    setPrerequisites(frontMatter.prerequisites);
    // set stacks
    setStacks(frontMatter.stacks);
  }, [setPrerequisites, setStacks, frontMatter.prerequisites, frontMatter.stacks]);

  return (
    <div>
      <article className="max-w-4xl prose prose-green">
        <div className="mb-4">
          <Thumbnail title={frontMatter.title} src={frontMatter.thumbnail} />
        </div>

        <strong>{dayjs(frontMatter.date).fromNow()}</strong>
        <h1>{frontMatter.title}</h1>

        <p>{frontMatter.description}</p>

        <MDXRemote components={components} {...source} />
      </article>
    </div>
  );
};

export default PostPage;

interface Iparams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Iparams;
  // get the slug
  const { content, data } = getPost(slug);
  // serialize the data on the server side
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  //only get the slug from posts
  const posts = getAllPosts(["slug"]);

  // map through to return post paths
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
