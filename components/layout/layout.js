import MainHeader from "./MainHeader";

const Layout = ({ children }) => (
  <>
    <MainHeader />
    <main>{children}</main>
  </>
);

export default Layout;
