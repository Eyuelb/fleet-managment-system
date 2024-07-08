import { notifications } from "@mantine/notifications";
import { IconAlertTriangle, IconCheck, IconExclamationCircle } from "@tabler/icons-react";

const showNotification = ({
  withBorder = true,
  type = "success",
  message = "",
}) => {

  switch (type) {
    case "error":
      return notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        color: "red",
        title: "",
        message: message,
        icon: <IconExclamationCircle size="1rem" />,
      });
    case "warning":
      return notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        color: "yellow",
        title: "",
        message: message,
        icon: <IconAlertTriangle size="1rem" />,
      });
    case "success":
      return notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        color: "teal",
        title: "",
        message: message,
        icon: <IconCheck size="1rem" />,
      });
    default:
      return;
  }
};

export default showNotification;
