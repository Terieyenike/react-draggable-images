import "../styles.css";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
