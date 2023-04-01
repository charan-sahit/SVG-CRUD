import React from 'react'
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
const Update = () => {
  
    const [gameName, setGameName] = useState("");
    const [url, setUrl] = useState("");
    const [author, setAuthor] = useState("");
    const [pubDate, setPubDate] = useState("");
    const [id, setId] = useState("");
    const [isCheckedGameName, setIsCheckedGameName] = useState(false);
    const [isCheckedUrl, setIsCheckedUrl] = useState(false);
    const [isCheckedAuthor, setIsCheckedAuthor] = useState(false);
    const [isCheckedPubDate, setIsCheckedPubDate] = useState(false);

    // read them  from local storage
    // setGameName(localStorage.getItem("gameName"));
    // setUrl(localStorage.getItem("url"));
    // setAuthor(localStorage.getItem("author"));
    // setPubDate(localStorage.getItem("pubDate"));
    // setId(localStorage.getItem("id"));

    
    const handleGameNameChange = (event) => {
        setIsCheckedGameName(event.target.checked);
    }
    const handleUrlChange = (event) => {

        setIsCheckedUrl(event.target.checked);
    }
    const handleAuthorChange = (event) => {

        setIsCheckedAuthor(event.target.checked);
    }

    const handlePubDateChange = (event) => {

        setIsCheckedPubDate(event.target.checked);

    }

  
    return (
    <div>
        
        {/* add checkboxes whether game name, author, url have to be updated, and then enable texfields for input */}
        <div
        style={{

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "space-around",
            // marginLeft: "1.2em",
            marginTop: "1em",
            marginBottom: "1em",
        }}
        >
          <h1>Update Game Details</h1>
        <div class="checkbox-container"  >
        <input type="checkbox" id="gameName" name="gameName" value="gameName"  onChange={handleGameNameChange}/>
        <label for="gameName" style={{marginRight:'3em'}}> Game Name</label>
        <input type="text" id="gameName"  value={gameName} disabled={!isCheckedGameName} onChange={(event) => setGameName(event.target.value)}></input><br></br>
        </div>

        <div class="checkbox-container" >
        <input type="checkbox" id="url" name="url" value="url" onChange={handleUrlChange}/>
        <label for="url" style={{marginRight:'6.7em'}}> URL</label>
        <input type="text" id="url" name="url" value={url} disabled={!isCheckedUrl} onChange={(event) => setUrl(event.target.value)}></input><br></br>
        </div>

        <div class="checkbox-container" >
        <input type="checkbox" id="author" name="author" value="author" onChange={handleAuthorChange}/>
        <label for="author" style={{marginRight:'5.4em'}}> Author</label>
        <input type="text" id="author" name="author" value={author} disabled={!isCheckedAuthor} onChange={(event) => setAuthor(event.target.value)}></input><br></br>
        </div>

        <div class="checkbox-container" >
        <input type="checkbox" id="pubDate" name="pubDate" value="pubDate"onChange={handlePubDateChange} />
        <label for="pubDate" style={{marginRight:'1.2em'}}> Publication Date</label>
        <input type="text" id="pubDate" name="pubDate" value={pubDate} disabled={!isCheckedPubDate} onChange={(event) => setPubDate(event.target.value)}></input><br></br>
        </div>

        <Button

          style={{
            marginTop: "2em",
            marginLeft: "1.2em",
          }}

         onClick={ async () =>{
           const response = await axios.post("https://svg-crud-bqpq.onrender.com/game/update/" + localStorage.getItem("id"), {
            gameName: gameName === "" ? localStorage.getItem("gameName") : gameName,
            url: url === "" ? localStorage.getItem("url") : url,
            author: author === "" ? localStorage.getItem("author") : author,
            pubDate: pubDate === "" ? localStorage.getItem("pubDate") : pubDate,
          })
          // .then((response) => {
            // alert("Updated\t" + response.data.gameName);
            console.log(response.data);
          // });

          // clear local storage
          // localStorage.clear();

          // navigate to /dashboard
          window.location.href = "/dashboard";

         }} 
        >
        Update
        </Button>
        </div>
        

        
    </div>
  )
}

export default Update