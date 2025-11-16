import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/properties";

// Fetch all properties
export const getAllProperties = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch single property by ID
export const getPropertyById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Delete property
export const deleteProperty = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
