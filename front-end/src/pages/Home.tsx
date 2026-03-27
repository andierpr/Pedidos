import { Link } from "react-router";

const Home = () => {
  return (
    <div style={{ padding: 40 }}>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Registrar</Link>
    </div>
  );
};

export default Home;
