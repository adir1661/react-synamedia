const url = 'http://localhost:3001/nodes'


export async function getNodes(parentId = null) {
  await new Promise(res=>setTimeout(res,1000));
  const res = await fetch(`${url}?${parentId ? 'parent=' + parentId : ''}`);
  const data = await res.json();
  return { parent: parentId, nodes: data };
}
export async function addNode(name,parentId) {
  debugger;
  const res = await fetch(`${url}/${parentId}/nodes`,
  {
    method:'POST',
    body:JSON.stringify({name}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const data = await res.json();
  return { parent: parentId, node: data.data };
}