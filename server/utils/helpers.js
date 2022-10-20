const axios = require("axios");

const formatDate = (date) => {
  // Format date as MM/DD/YYYY
  return date.toLocaleDateString();
};

const fetchData = async (url, method = "GET", headers = {}, data = null) => {
  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });

    const responseData = response.data;

    if (!responseData || responseData.status === "ZERO_RESULTS") {
      throw new Error("Error fetching data");
    }

    return responseData;
  } catch (err) {
    throw new Error("Error fetching data");
  }
};

module.exports = {
  formatDate,
  fetchData,
};
