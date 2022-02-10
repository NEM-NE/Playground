import NavBar from "../components/NavBar";
export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="container">{children}</div>
      <style jsx global>{`
        container {
          width: 10%;
        }

        a {
          text-decoration: none;
          color: black;
        }
      `}</style>
    </>
  );
}
