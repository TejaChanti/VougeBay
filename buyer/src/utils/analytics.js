import axios from "axios";

export const trackEvent = async (eventType, eventData = {}) => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { "x-auth-token": token } : {};

    await axios.post(
      "http://localhost:5000/api/analytics/track-event",
      {
        eventType,
        eventData,
      },
      { headers }
    );
  } catch (error) {
    console.error("Failed to send analytics event:", error);
  }
};
