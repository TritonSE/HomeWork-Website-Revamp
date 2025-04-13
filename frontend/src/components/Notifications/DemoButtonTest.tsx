import React from "react";
import { useNotification } from "./NotificationProvider";

const DemoButton: React.FC = () => {
  const notify = useNotification();

  return (
    <button
      className="m-auto w-48 rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 w-xs"
      onClick={() =>
        notify({
          text: "Contacts deleted successfully (2)",
          type: "success",
          duration: 5000,
        })
      }
    >
      Send Notification
    </button>
  );
};

export default DemoButton;
