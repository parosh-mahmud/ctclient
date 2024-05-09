import TagManager from "react-gtm-module";

const GTMService = {
  initialize: () => {
    const tagManagerArgs = {
      gtmId: "GTM-586ZC8VN", // Replace GTM-XXXXXXX with your GTM ID
      dataLayer: {
        event: "pageview",
        // Add other initial dataLayer values if needed
      },
    };
    TagManager.initialize(tagManagerArgs);
  },
};

export default GTMService;
