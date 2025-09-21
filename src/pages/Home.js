import React, {useState} from "react";

/*
  Home page: create and store grocery lists locally (for demo).
  In production, connect to backend API to persist lists.
*/

export default function Home(){
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const [item, setItem] = useState("");

  function addList(){
    if(!name) return alert("Please enter list name");
    setLists([...lists, {id: Date.now(), name, items: []}]);
    setName("");
  }
  function addItemTo(listId){
    if(!item) return alert("Enter an item");
    setLists(lists.map(l => l.id===listId ? {...l, items: [...l.items, item]} : l));
    setItem("");
  }
  return (
    <div>
      <h2>Create Grocery Lists</h2>
      <div style={{marginBottom:10}}>
        <input placeholder="List name" value={name} onChange={e=>setName(e.target.value)} />
        <button onClick={addList}>Create</button>
      </div>
      {lists.map(l=>(
        <div key={l.id} style={{border:"1px solid #ddd", padding:10, marginBottom:8}}>
          <h3>{l.name}</h3>
          <div>
            <input placeholder="Add item" value={item} onChange={e=>setItem(e.target.value)} />
            <button onClick={()=>addItemTo(l.id)}>Add</button>
          </div>
          <ul>
            {l.items.map((it, idx)=><li key={idx}>{it}</li>)}
          </ul>
        </div>
      ))}
      <p><strong>Note:</strong> To connect lists to transit & pricing, click Transit & Prices. API integration points are marked in that page's comments.</p>
    </div>
  );
}
