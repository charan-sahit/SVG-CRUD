import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gameName, setGameName] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [pubDate, setPubDate] = useState("");
  const [games, setGames] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);


  useEffect(() => {
    // get all the games in database
  axios
  .get("https://svg-crud-bqpq.onrender.com/game/")
  .then((response) => {
      console.log(response.data);
      setGames(response.data);
    });
  }, [buttonClicked]);  
  const navigate = useNavigate();
 
  const resetInputs = () => {
    setGameName("");
    setUrl("");
    setAuthor("");
    setPubDate("");
  };
  

  


  return <div>
    <div>
      
      <Box sx={{ flexGrow: 1 }}>
      <h1>Create Game</h1>
      <Grid container justifyContent={"center"} direction={"row"} alignItems={'center'}>
        <Grid item xs={2}>
          <TextField
            label="Game Name"
            variant="outlined"
            value={gameName}
            onChange={(event) => setGameName(event.target.value)}
          />
        </Grid> 
        <Grid item xs={2}>
          <TextField
            label="URL"
            variant="outlined"
            value={url}
            onChange={(event) => setUrl(event.target.value)}

          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Publish Date (dd-mm-yy)"
            variant="outlined"
            value={pubDate}
            onChange={(event) => setPubDate(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={async () => {
            // check if all fields are filled 
            if (gameName === "" ) {
              alert("Please fill in the Game Name");
              return;
            }

            if(url === "") {
              alert("Please fill in the URL");
              return;
            }

            if(author === "") {
              alert("Please fill in the Author");
              return;
            }

            // check if date is in dd-mm-yy format
            if(pubDate === "") {
              alert("Please fill in the Publish Date");
              return;
            }
            else {
              const date = pubDate.split("-");
              if(date.length !== 3) {
                alert("Please fill in the Publish Date in dd-mm-yy format");
                return;
              }
              if(date[0].length > 2 || date[1].length > 2 || date[2].length > 2) {
                alert("Please fill in the Publish Date in dd-mm-yy format");
                return;
              }
              if(isNaN(date[0]) || isNaN(date[1]) || isNaN(date[2])) {
                alert("Please fill in the Publish Date in dd-mm-yy format");
                return;
              }  
            } 
            
            const pattern =  /^https?:\/\/[\w.-]+\.[a-z]{2,}$/i;
            if(!pattern.test(url)) {
              alert("Please fill in a valid URL");
              return;
            }


            const newGame = {
              gameName: gameName,
              url: url,
              author: author,
              pubDate: pubDate
            };
            const response = await axios.post("https://svg-crud-bqpq.onrender.com/game/add", newGame)

              // .then((response) => {
                // alert("Created\t" + response.data.gameName);
                console.log(response.data);
              // });
              setButtonClicked(!buttonClicked);
            // window.location.reload();
              resetInputs();
          }}>
            Create Game
          </Button>
          </Grid>

      </Grid>  
      </Box>

      <div>
        <h1>Games Catalogue</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', justifyContent: 'start' }}>
        {/* <div style={{ display: 'flex', justifyContent: 'left' }}> */}
        {games.map((game) => (
          <div style={{
            
          }}>
          {/* <div key={game._id}>
            <h3>{game.gameName}</h3>
            <p>{game.url}</p>
            <p>{game.author}</p>
            <p>{game.pubDate}</p>
          </div> */}

          <Card sx={{ width: 300 }}>
            <CardActionArea>
              <CardContent>
                <div 
                  style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "space-between",
                  }}
                >
                <h3>{game.gameName}</h3>
                <Button
                  onClick={async () => {
                    // confirm deletion
                    if (window.confirm("Are you sure you want to delete this game?") === false) {
                      return;
                    }


                    const response = await axios.delete("https://svg-crud-bqpq.onrender.com/game/delete/" + game._id)
                    // .then((response) => {
                      // alert("Deleted\t" + response.data.gameName);
                      console.log(response.data);
                      setButtonClicked(!buttonClicked);
                      
                    // });

                    // window.location.reload();
                  }}
                >delete</Button>
                
                </div>
                <a href={game.url}>{game.url}</a>
                {/* <p>{game.url}</p> */}
                <p>Author: {game.author}</p>
                <div
                  style={{
                    display: "flex",
                    direction: "row",
                    justifyContent: "space-between",
                  }}
                >
                <p>Date of Publication: {game.pubDate}</p>
                {console.log(game.pubDate)}
                
                <Button
                  onClick={() => {
                    localStorage.setItem("gameName", game.gameName)
                    localStorage.setItem("url", game.url)
                    localStorage.setItem("author", game.author)
                    localStorage.setItem("pubDate", game.pubDate)
                    localStorage.setItem("id", game._id)
                    // redirect to the update page
                    navigate("/update");
                  }}

                >update</Button>
                </div>
              </CardContent>
            </CardActionArea>  
          </Card>
          </div>
        ))}

</div>  
      </div>

    </div>

  </div>;
};

export default Home;
