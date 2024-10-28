

import { useState } from 'react'; // Import useState for managing state within the component
import Button from '@mui/material/Button'; // Import Button component from Material UI
import * as React from 'react'; // Import React library
import Card from '@mui/material/Card'; // Import Card component from Material UI for displaying weather info
import CardContent from '@mui/material/CardContent'; // Import CardContent to structure card content
import CardMedia from '@mui/material/CardMedia'; // Import CardMedia to display an image in the card
import Typography from '@mui/material/Typography'; // Import Typography for styled text
import CardActionArea from '@mui/material/CardActionArea'; // Import CardActionArea to make the card clickable
import TextField from '@mui/material/TextField'; // Import TextField for input

export default function WeatherApp() {
    // API configuration constants
    const ApiUrl = "https://api.openweathermap.org/data/2.5/weather"; // Base URL for weather API
    const ApiKey = "a366ec73f35ed60416e755966540a331"; // Your API key for authentication

    // useState hooks to manage city input and fetched weather data
    const [city, setCity] = useState(""); // Holds the user's city input
    const [weatherData, setWeatherData] = useState(null); // Stores the data received from the API

    // Function to fetch weather information for the specified city
    const getWeatherInfo = async () => {
        try {
            const response = await fetch(`${ApiUrl}?q=${city}&appid=${ApiKey}&units=metric`); // Fetch data from API with city and key
            const responseJson = await response.json(); // Parse the response to JSON format
            setWeatherData(responseJson); // Store the response in the weatherData state
            console.log(responseJson); // Log the response for debugging
        } catch (error) {
            console.error("Error fetching the weather data:", error); // Error handling in case API call fails
        }
    };

    // Event handler for updating the city input as user types
    const updateCity = (event) => {
        setCity(event.target.value); // Update city state with the value from the input field
    };

    // Event handler for the form submission
    const handle = (event) => {
        event.preventDefault(); // Prevent page refresh on form submit
        getWeatherInfo(); // Fetch weather information
        setCity(""); // Clear the city input after search
    };

    // JSX to render the app
    return (
        <div>
            <h1>Weather App</h1> {/* Display the app title */}

            <form onSubmit={handle}> {/* Form for inputting the city name */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                        id="city"
                        label="Input City"
                        variant="outlined"
                        required
                        value={city} // Set the TextField value to city state
                        onChange={updateCity} // Update city as user types
                        style={{ background: "white", marginRight: "10px" }}
                    />
                    <Button type="submit" variant="contained" color="success"> {/* Submit button */}
                        Search
                    </Button>
                </div>
            </form>
            <br />

            {weatherData && ( // Conditionally render the card if weatherData is available
                <Card sx={{ maxWidth: 345, marginTop: "20px" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D" // Placeholder weather image
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Weather Info for {weatherData.name} {/* Display city name */}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Temperature: {weatherData.main.temp} °C {/* Display temperature */}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Condition: {weatherData.weather[0].description} {/* Display weather condition */}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Humidity: {weatherData.main.humidity}% {/* Display humidity */}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Wind Speed: {weatherData.wind.speed} m/s {/* Display wind speed */}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </div>
    );
}
