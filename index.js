import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.use(express.static("public"));  // Allows our static files to be located (in the public folder).

app.use(bodyParser.urlencoded({ extended: true }));


// Rendering the main page
app.get("/", (req, res) => {
   res.render("index.ejs", {
      drinkId: "",
      drinkName: "",
      alcohol: "",
      drinkImage: "",
      instructions: "",
      ingredient: "",
   })
});

// Getting a radom cocktail
app.post("/get-cocktail", async (req, res) => {
   const result = await axios.get(`${API_URL}/random.php`);

   res.render("index.ejs", {
      drinkId: (result.data.drinks[0].idDrink),
      drinkName: (result.data.drinks[0].strDrink),
      drinkImage: JSON.stringify(result.data.drinks[0].strDrinkThumb),
      alcohol: (result.data.drinks[0].strAlcoholic),
      instructions: (result.data.drinks[0].strInstructions),
      ingredient: result.data.drinks[0],

   });
});

// Getting a cocktail by id
app.post("/get-cocktail-by-id", async (req, res) => {
   const searchId = req.body.id;
   console.log(req.body.id);
   try {
      const response = await axios.get(API_URL + "/lookup.php?i=" + searchId);
      console.log(response.data);
      res.render("index.ejs", {
         drinkId: (response.data.drinks[0].idDrink),
         drinkName: (response.data.drinks[0].strDrink),
         drinkImage: JSON.stringify(response.data.drinks[0].strDrinkThumb),
         alcohol: (response.data.drinks[0].strAlcoholic),
         instructions: (response.data.drinks[0].strInstructions),
         ingredient: response.data.drinks[0],
      });
   } catch (error) {
      console.error("Failed to make request:", error.message); // 'error.message' displays the first message sent by the error.
      res.status(404).send(error.message); // Look into error handling.
   }
});


app.post("/random-alcoholic-or-non", async (req, res) => {
   console.log("THIS:" + req.body.alcoholicOrNon);
   if (req.body.alcoholicOrNon == "alcoholic") {
      try {
         const result = await axios.get(API_URL + "/filter.php?a=Alcoholic");
         const randomAlcoholic = result.data.drinks[Math.floor(Math.random() * result.data.drinks.length)]; // Random alcoholic cocktail
         const randomAlcoholicId = randomAlcoholic.idDrink;
         console.log(randomAlcoholic);
         console.log(randomAlcoholicId);

         const response = await axios.get(API_URL + "/lookup.php?i=" + randomAlcoholicId);
         console.log(response.data);
         res.render("index.ejs", {
            drinkId: (response.data.drinks[0].idDrink),
            drinkName: (response.data.drinks[0].strDrink),
            drinkImage: JSON.stringify(response.data.drinks[0].strDrinkThumb),
            alcohol: (response.data.drinks[0].strAlcoholic),
            instructions: (response.data.drinks[0].strInstructions),
            ingredient: response.data.drinks[0],
         });


      } catch (error) {
         console.error("Failed to make request:", error.message); // 'error.message' displays the first message sent by the error.
         res.status(404).send(error.message); // Look into error handling.
      };
   } else if (req.body.alcoholicOrNon == "nonAlcoholic") {
      try {
         const result = await axios.get(API_URL + "/filter.php?a=Non_Alcoholic");
         const randomNonAlcoholic = result.data.drinks[Math.floor(Math.random() * result.data.drinks.length)]; // Random alcoholic cocktail
         const randomNonAlcoholicId = randomNonAlcoholic.idDrink;
         console.log(randomNonAlcoholic);
         console.log(randomNonAlcoholicId);

         const response = await axios.get(API_URL + "/lookup.php?i=" + randomNonAlcoholicId);
         console.log(response.data);
         res.render("index.ejs", {
            drinkId: (response.data.drinks[0].idDrink),
            drinkName: (response.data.drinks[0].strDrink),
            drinkImage: JSON.stringify(response.data.drinks[0].strDrinkThumb),
            alcohol: (response.data.drinks[0].strAlcoholic),
            instructions: (response.data.drinks[0].strInstructions),
            ingredient: response.data.drinks[0],
         });


      } catch (error) {
         console.error("Failed to make request:", error.message); // 'error.message' displays the first message sent by the error.
         res.status(404).send(error.message); // Look into error handling.
      };

   } else if (req.body.alcoholicOrNon == "allCocktails") {
      try {
         const result = await axios.get(`${API_URL}/random.php`);
         res.render("index.ejs", {
            drinkId: (result.data.drinks[0].idDrink),
            drinkName: (result.data.drinks[0].strDrink),
            drinkImage: JSON.stringify(result.data.drinks[0].strDrinkThumb),
            alcohol: (result.data.drinks[0].strAlcoholic),
            instructions: (result.data.drinks[0].strInstructions),
            ingredient: result.data.drinks[0],
      
         });
      } catch (error) {
         console.error("Failed to make request:", error.message); // 'error.message' displays the first message sent by the error.
         res.status(404).send(error.message); // Look into error handling.
      }
   }
});

// app.post("/get-random-non-alcoholic", async (req, res) => {
//    console.log(req.body.nonAlcoholic);
//    if (req.body.nonAlcoholic) {
//       try {
//          const result = await axios.get(API_URL + "/filter.php?a=Non_Alcoholic");
//          const randomNonAlcoholic = result.data.drinks[Math.floor(Math.random() * result.data.drinks.length)]; // Random alcoholic cocktail
//          const randomNonAlcoholicId = randomNonAlcoholic.idDrink;
//          console.log(randomNonAlcoholic);
//          console.log(randomNonAlcoholicId);

//          const response = await axios.get(API_URL + "/lookup.php?i=" + randomNonAlcoholicId);
//          console.log(response.data);
//          res.render("index.ejs", {
//             drinkId: (response.data.drinks[0].idDrink),
//             drinkName: (response.data.drinks[0].strDrink),
//             drinkImage: JSON.stringify(response.data.drinks[0].strDrinkThumb),
//             alcohol: (response.data.drinks[0].strAlcoholic),
//             instructions: (response.data.drinks[0].strInstructions),
//             ingredient: response.data.drinks[0],
//          });


//       } catch (error) {
//          console.error("Failed to make request:", error.message); // 'error.message' displays the first message sent by the error.
//          res.status(404).send(error.message); // Look into error handling.
//       };
//    }
// });




app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});