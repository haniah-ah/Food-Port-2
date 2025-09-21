import React, {useState} from "react";
import axios from "axios";

/*
  Transit page:
  - Select a grocery list (for demo copy/paste list items)
  - Enter your location
  - The app will call backend endpoints to:
     1) Retrieve nearby stores and prices for the grocery items (STORE PRICING API)
     2) Retrieve transit routes from user's location to each store (TRANSIT API)
  API integration points are marked below.
*/

export default function Transit(){
  const [itemsText, setItemsText] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);

  async function findBest(){
    const items = itemsText.split("\n").map(s=>s.trim()).filter(Boolean);
    if(items.length===0) return alert("Paste items (one per line)");
    if(!location) return alert("Enter your location");

    // 1) Call backend to get store price totals for the list
    // Backend endpoint: POST /api/pricing
    // Body: { location: "...", items: ["milk","eggs", ...] }
    // Response: [{storeId, name, address, priceTotal, items: [{item, price}], lat, lng}, ...]
    // -> IMPLEMENTATION NOTE: integrate a grocery pricing API or web-scrape store sites in backend.
    try{
      const pricingResp = await axios.post("/api/pricing", {location, items});
      const stores = pricingResp.data;

      // 2) For each store, call backend transit route planner
      // Backend endpoint: POST /api/route
      // Body: { from: location, to: {lat, lng} }
      // Response: {durationMinutes, steps, transitMode}
      const storeWithRoutes = [];
      for(const s of stores){
        const routeResp = await axios.post("/api/route", {from: location, to: {lat: s.lat, lng: s.lng}});
        storeWithRoutes.push({...s, route: routeResp.data});
      }
      setResults(storeWithRoutes);
    }catch(err){
      console.error(err);
      alert("Error contacting backend. See console.");
    }
  }

  return (
    <div>
      <h2>Find transit and lowest-price store</h2>
      <p>Paste your grocery items (one per line), enter your location (address or lat,lng), then click Find Best.</p>
      <textarea rows={6} cols={50} placeholder="one item per line" value={itemsText} onChange={e=>setItemsText(e.target.value)} />
      <div>
        <input placeholder="Your location (address or lat,lng)" value={location} onChange={e=>setLocation(e.target.value)} />
        <button onClick={findBest}>Find Best</button>
      </div>

      <div>
        {results.map(r=>(
          <div key={r.storeId} style={{border:"1px solid #ddd", padding:10, marginTop:8}}>
            <h3>{r.name} — ${r.priceTotal.toFixed(2)}</h3>
            <p>{r.address}</p>
            <p>Transit: {r.route ? `${r.route.durationMinutes} min via ${r.route.transitMode}` : "No route"}</p>
            <details>
              <summary>Itemized prices</summary>
              <ul>{r.items.map((it,idx)=><li key={idx}>{it.item}: ${it.price.toFixed(2)}</li>)}</ul>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
