import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const Test = () => {

    const [gameName, setGameName] = useState("");
    const [url, setUrl] = useState("");
    const [author, setAuthor] = useState("");
    const [pubDate, setPubDate] = useState("");
    const [id, setId] = useState("");

    // read them  from local storage
    var gameName1 = localStorage.getItem("gameName");
    // console.log(gameName1);
    // setGameName(gameName1);
    // setUrl(localStorage.getItem("url"));
    // setAuthor(localStorage.getItem("author"));
    // setPubDate(localStorage.getItem("pubDate"));
    // setId(localStorage.getItem("id"));
  return (
    <div>

        <Button
                
        >
            Update the game
        </Button>
    </div>
  )
}

export default Test