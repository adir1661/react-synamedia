import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNodes, addNode } from './nodesAPI';
import { addNodesToTree, addNodeToTree } from './nodesOperations';

const initialState = {
  tree: {},
  status: 'idle',
};

export const addNodeAsync = createAsyncThunk(
  'nodes/addNode',
  async ({ name, parentId }) => {
    return await addNode(name, parentId);;
  }
);

export const getNodesAync = createAsyncThunk(
  'nodes/getNodes',
  async (parentId) => {
    return await getNodes(parentId);
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getNodesAync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNodesAync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { nodes, parent } = action.payload
        if (!parent) {
          const { name, _id } = nodes[0];
          state.tree = { name, _id, childrenLoaded: false }
        } else {
          const newNodes = nodes.map(({ name, _id }) => ({ name, _id, childrenLoaded: false }))
          addNodesToTree(state.tree, newNodes, parent);
        }
      }).addCase(addNodeAsync.fulfilled, (state, action) => {
        const { node, parent } = action.payload;
        const { name, _id } = node
        addNodeToTree(state.tree, { name, _id, childrenLoaded: false }, parent)
      });
  },
});

export const selectNodes = (state) => state.nodes.tree;

export default counterSlice.reducer;
