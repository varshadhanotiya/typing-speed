import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getText = async (loremType, type, number) => {
  try {
    const response = await axios.get("https://randommer.io/api/Text/LoremIpsum", {
      params: {
        loremType: loremType,
        type: type,
        number: number,
      },
      headers: {
        accept: "*/*",
        "X-Api-Key": API_KEY,
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
