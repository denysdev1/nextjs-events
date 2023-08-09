import { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState(null);

  const showNotification = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotification = () => {
    setActiveNotification(null);
  };

  useEffect(() => {
    if (
      activeNotification?.status === "success" ||
      activeNotification?.status === "error"
    ) {
      const timerId = setTimeout(() => {
        hideNotification();
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [activeNotification]);

  const context = {
    notification: activeNotification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};
