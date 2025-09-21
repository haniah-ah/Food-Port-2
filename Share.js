import React, {useState} from "react";
import axios from "axios";

/*
  Share page:
  - Users can post a grocery list for pickup
  - Neighbors can browse lists and accept delivery for a small fee
  Backend endpoints expected:
   - POST /api/share  {listName, items, pickupLocation, fee}
   - GET  /api/share  -> list of public shared lists
   - POST /api/share/accept {shareId, userId}
  Authentication & payment integration required in production (Stripe/PayPal).
*/

export default function Share(){
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");
  const [itemsText, setItemsText] = useState("");
  const [loc, setLoc] = useState("");
  const [fee, setFee] = useState(5);

  async function postList(){
    const items = itemsText.split("\n").map(s=>s.trim()).filter(Boolean);
    if(!name || items.length===0 || !loc) return alert("Please complete form");
    // Call backend: POST /api/share
    try{
      await axios.post("/api/share", {listName: name, items, pickupLocation: loc, fee});
      alert("Shared! Refreshing list...");
      fetchLists();
    }catch(err){
      console.error(err);
      alert("Failed to share (see console)");
    }
  }

  async function fetchLists(){
    const resp = await axios.get("/api/share");
    setLists(resp.data);
  }

  return (
    <div>
      <h2>Share grocery list</h2>
      <div style={{border:"1px solid #ddd", padding:10, marginBottom:10}}>
        <input placeholder="List title" value={name} onChange={e=>setName(e.target.value)} /><br/>
        <textarea rows={4} cols={50} placeholder="one item per line" value={itemsText} onChange={e=>setItemsText(e.target.value)} /><br/>
        <input placeholder="Pickup location" value={loc} onChange={e=>setLoc(e.target.value)} />
        <input type="number" value={fee} onChange={e=>setFee(Number(e.target.value))} />
        <button onClick={postList}>Share</button>
      </div>

      <div>
        <button onClick={fetchLists}>Load shared lists</button>
        {lists.map(s=>(
          <div key={s.id} style={{border:"1px solid #ccc", padding:8, marginTop:8}}>
            <h3>{s.listName} — ${s.fee.toFixed(2)}</h3>
            <p>Pickup: {s.pickupLocation}</p>
            <ul>{s.items.map((it,idx)=><li key={idx}>{it}</li>)}</ul>
            <button onClick={()=>alert("Accept flow: should call backend and trigger payment flow")}>Accept delivery</button>
          </div>
        ))}
      </div>
    </div>
  );
}
