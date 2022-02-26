export function findNode(subTree, nodeId) {
    if (subTree._id == nodeId) {
        return subTree;
    } else if (subTree.children) {
        for (const subTreeItem of subTree.children) {
            const node = findNode(subTreeItem, nodeId);
            if (node !== null) return node;
        }
    }
    return null;
}

export function addNodeToTree(tree, node, parentId){
    const nodeParent = findNode(tree,parentId);
    if (!nodeParent.children) nodeParent.children = []
    nodeParent.children.push(node)
}

export function addNodesToTree(tree, nodes, parentId){
    const nodeParent = findNode(tree,parentId);
    nodeParent.children = nodes
    nodeParent.childrenLoaded = true;
}