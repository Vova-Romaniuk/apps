import { Link, useLocation } from "react-router-dom";

interface PropsCustomLink {
  children: string;
  to: string;
}

function CustomLink({ children, to }: PropsCustomLink) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-xl font-medium ml-5 transition duration-200 ${
        isActive ? "text-white underline" : "text-green-400 hover:text-white"
      }`}>
      {children}
    </Link>
  );
}

export default CustomLink;
