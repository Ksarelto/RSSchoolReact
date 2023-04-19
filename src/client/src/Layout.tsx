import { Outlet, Link } from "react-router-dom";

export const Layout = () => (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <hr />
      <Outlet />
    </div>
);