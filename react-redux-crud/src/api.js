const API_BASE_URL = 'https://your-api-url.com';

export const fetchItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items`);
  const data = await response.json();
  return data;
};

export const addItem = async (newItem) => {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: newItem }),
  });
  const data = await response.json();
  return data;
};