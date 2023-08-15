import Layout from "../components/layout/layout";
import { NotificationContextProvider } from "../store/notificationContext";
import "../styles/globals.css";

const LayoutPage = ({ children }) => (
  <html lang="en">
    <body>
      <NotificationContextProvider>
        <Layout>{children}</Layout>
      </NotificationContextProvider>
    </body>
  </html>
);

export default LayoutPage;
