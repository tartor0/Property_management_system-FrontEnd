import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/properties";

// Fetch all properties
export const getAllProperties = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

// Fetch single property by ID
export const getPropertyById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    throw error;
  }
};

// Create new property with images
export const createProperty = async (propertyData, images) => {
  try {
    const formData = new FormData();

    // Add property data as JSON string
    formData.append("property", JSON.stringify(propertyData));

    // Add images if provided
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  }
};

// Update existing property
export const updateProperty = async (id, propertyData, images) => {
  try {
    const formData = new FormData();

    // Add property data as JSON string
    formData.append("property", JSON.stringify(propertyData));

    // Add new images if provided
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error updating property ${id}:`, error);
    throw error;
  }
};

// Delete property
export const deleteProperty = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting property ${id}:`, error);
    throw error;
  }
};