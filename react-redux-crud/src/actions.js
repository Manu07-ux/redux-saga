export const SET_ITEMS = 'SET_ITEMS';

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      console.log('Fetched Data:', data); // Add this line
      dispatch({ type: 'SET_ITEMS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ITEMS_ERROR', payload: error.message });
    }
  };
};

export const addItem = (item) => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      dispatch({ type: 'ADD_ITEM', payload: data });
    } catch (error) {
      dispatch({ type: 'API_ERROR', payload: error.message });
    }
  };
};


export const updateItem = (item) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      dispatch({ type: 'UPDATE_ITEM', payload: data });
    } catch (error) {
      dispatch({ type: 'API_ERROR', payload: error.message });
    }
  };
};

export const handleEditItem = (id, text) => {
  return {
    type: 'EDIT_ITEM',
    payload: { id, text },
  };
};

export const handleDeleteItem = (itemId) => {
  return {
    type: 'DELETE_ITEM',
  };
};
export const deleteItem = (itemId) => {
  return async (dispatch) => {
    try {
      await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'DELETE_ITEM', payload: itemId });
    } catch (error) {
      dispatch({ type: 'API_ERROR', payload: error.message });
    }
  };
};



export const setItems = (items) => ({
  type: 'SET_ITEMS',
  payload: items,
});