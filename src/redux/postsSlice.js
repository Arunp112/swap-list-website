import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    loading: true,
    currentPage: 1,
    itemsPerPage: 6,
    gridView: false,
    showFeedback: false,
  },
  reducers: {
    removePost: (state, action) => {
      state.data = state.data.filter(post => post.id !== action.payload);
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    toggleView: (state) => {
      state.gridView = !state.gridView;
    },
    toggleFeedback: (state) => {
      state.showFeedback = !state.showFeedback;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
  },
});

export const { removePost, setPage, toggleView, toggleFeedback } = postsSlice.actions;
export default postsSlice.reducer;