import api from "./api";

export const itemService = {
  // Get all non-deleted items
  getItems: () => api.get("/items"),

  // Get single item (basic info)
  getItem: (id) => api.get(`/items/${id}`),

  // Create item
  createItem: (data) => api.post("/items", data),

  // Update item
  updateItem: (id, data) => api.put(`/items/${id}`, data),

  // Soft delete (move to trash)
  deleteItem: (id) => api.delete(`/items/${id}`), // backend sets deleted: true

  // Verify password for protected item
  verifyPassword: (id, password) => api.post(`/items/${id}/verify`, { password }),

  // Trash endpoints (if implemented)
  getTrashItems: () => api.get("/items/trash"),
  restoreItem: (id) => api.put(`/items/${id}/restore`),
  permanentDelete: (id) => api.delete(`/items/${id}/permanent`),
};