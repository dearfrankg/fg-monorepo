// Import the link props
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="py-2">
      <Link href="/">
        <a className="text-2xl font-bold text-green-500">Frank's Dev Blog</a>
      </Link>
    </header>
  );
};

export default Header;
