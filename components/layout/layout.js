import MainHeader from "./MainHeader";
import Notification from "../ui/Notification";
import { useContext } from "react";
import { NotificationContext } from "../../store/notificationContext";

const Layout = ({ children }) => {
  const { notification: activeNotification } = useContext(NotificationContext);

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
