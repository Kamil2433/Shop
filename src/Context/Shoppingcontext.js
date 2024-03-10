import React, { useState } from "react";
import { useContext } from "react";
import { useLogin } from "./LoginContext";
import useLocalStoragehook from "../hooks/useLocalstorage";

const Shopcontext = React.createContext();

export function useShop() {
  return useContext(Shopcontext);
}

export default function Shoppingcontext({ children }) {
  const { auth } = useLogin();
  const [items, setitems] = useLocalStoragehook("items", " ");
  const [Showalert, setalert] = useState(false);
  const [message, setmessage] = useState("");
  const [variant, setvariant] = useState("success");
  const [list, setlist] = useLocalStoragehook("list", []);
  const [count, setcount] = useLocalStoragehook("count", 0);
  const [recent, setrecent] = useLocalStoragehook("recent", []);
  const [relist, setre] = useLocalStoragehook("re", []);
  const [dataforbar, setbar] = useLocalStoragehook("bardata", "");
  const [dataforpie, setpie] = useLocalStoragehook("piedata", "");
  const sectorCounts = {};




  function addItemToList(item) {
    setlist((prevList) => [...prevList, item]);
    setcount(list.length+1 );
    countAndFormat();
  }

  async function fetchitems() {
    const response = await fetch("http://localhost:3200/api/shop/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      //  body:JSON.stringify({id:inputid,password:inputpassword})
    });
    const res = await response.json();
    setitems(res);
    console.log(res);
    getrecent();
    dataforgraph()
  }

  async function dataforgraph() {
    const response = await fetch("http://localhost:3200/api/shop/listsLastTen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "auth-token": `${auth}`
      },
      //  body:JSON.stringify({id:inputid,password:inputpassword})
    });
    const res = await response.json();
    if(response.ok){


      setbar(res)
      console.log("here is data for last 10-")
      console.log(res);
      getCountArray(res)
      getcountforpie()

    }
  }

  function getCountArray(data) {
    const countMap = {};
    
    // Count occurrences of each item
    data.forEach(item => {
        countMap[item] = (countMap[item] || 0) + 1;
    });
    
    // Convert countMap to array of objects
    const result = [];
    for (const name in countMap) {
        result.push({ name: name, count: countMap[name] });
    }
    
   setbar(result)
   console.log("bar data")
   console.log(result)
}


  async function getrecent() {
  
    const response = await fetch("http://localhost:3200/api/shop/listslatest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "auth-token": `${auth}`
      },
      //  body:JSON.stringify({id:inputid,password:inputpassword})
    });
    const res = await response.json();

    if (response.ok) {
      setrecent(res);
      console.log(res);


     const arr=await sortItemsByRecent(res)
     console.log("hre is the arrr")   
     console.log(arr)
     setitems(arr)

      // window.location.reload(false)


    }
  }

  function sortItemsByRecent(res) {
    const recentItems = items.filter(item => res.includes(item.name));
    const otherItems = items.filter(item => !res.includes(item.name));
    return [...recentItems, ...otherItems];
}


  async function addlist() {
    const response = await fetch("http://localhost:3200/api/shop/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "auth-token": `${auth}`
      },
        body:JSON.stringify({items:list})
    });
    const res = await response.json();

    if(response.ok){

      setlist([])
      setcount(0)
      console.log(res);
      getrecent();
    


    }
  }


  async function getcountforpie() {
    const a = await dataforbar.forEach((entry) => {
      if (entry.sector !== null) {
        const sector = entry.name;

        // Check if the sector is already in the counts object
        if (entry.sector !== "" && sector !== "undefined") {
          if (sectorCounts[sector]) {
            // Increment the count if it exists

            sectorCounts[sector]++;
          } else {
            // Initialize the count to 1 if the sector is encountered for the first time
            sectorCounts[sector] = 1;
          }
        }
      }
    });

    // console.log(sectorCounts);

    var obj = await Object.entries(sectorCounts).map(([sector, count]) => ({
      sector,
      count,
    }));


    setpie(obj);
      console.log("here is the pie data")
      console.log(obj)


  }


  function countAndFormat() {
    const counts = list.reduce((acc, curr) => {
      if (acc[curr]) {
        ++acc[curr];
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});

    const formattedData = Object.keys(counts).map((key) => ({
      name: key,
      count: counts[key]+1,
    }));

    setre(formattedData);

    // console.log(formattedData);
  }

  return (
    <Shopcontext.Provider
      value={{
        Showalert,
        setalert,
        message,
        setmessage,
        variant,
        setvariant,
        fetchitems,
        items,
        addItemToList,
        count,
        relist,
        addlist,
        setitems,
        dataforbar,
        dataforpie
      }}
    >
      {children}
    </Shopcontext.Provider>
  );
}
