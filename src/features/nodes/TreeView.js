import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNodeAsync,
  getNodesAync,
  selectNodes,
} from './nodesSlice';
import MuiTreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { makeStyles } from '@mui/styles';
import { findNode } from './nodesOperations'
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles({
  treeItem: {
    '& .MuiTreeItem-content': {
      padding: '0'
    }
  }
})

function AddNode({ node , onAddNode}) {
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  return <TreeItem
    key={node._id + '-add'}
    nodeId={node._id + '-add'}
    label={
      <span>
        <input value={name} placeholder='add node name' onChange={ev => setName(ev.target.value)} />
        <button onClick={()=>{
          onAddNode(name,node._id)
          setName('')
        }} >add</button>
      </span>} />
}

export function TreeView() {
  const nodes = useSelector(selectNodes);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onAddNode = useCallback(async (name, parentId)=>{
    await dispatch(addNodeAsync({name, parentId}))
  },[])
  useEffect(() => {
    dispatch(getNodesAync(null))
  }, [])
  console.log(nodes)
  const renderTree = (node) => {
    const children = <>
      {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : []}
      <AddNode node={node} onAddNode={onAddNode} />
    </>
    return <TreeItem
      key={node._id}
      nodeId={node._id}
      label={node.name}>
      {node.childrenLoaded ? children : <LinearProgress />}
      <>{/*fragment for the parent to render the collapse icon*/}</>
    </TreeItem>
  };

  return (
    <MuiTreeView
      className={classes.treeItem}
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={[]}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={function (ev, nodeId) {
        const node = findNode(nodes, nodeId)
        if (!node.childrenLoaded)
          dispatch(getNodesAync(nodeId))
        console.log(nodeId)
      }}
    >
      {renderTree(nodes)}
    </MuiTreeView>
  );
}
