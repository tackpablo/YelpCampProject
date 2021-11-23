const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '619a8f0fb036469cc0f02715',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi mollitia quibusdam quasi modi atque quo aspernatur earum vitae blanditiis, excepturi placeat molestias corporis ipsam, aliquam accusantium obcaecati suscipit tempore doloremque?',
            price,
            geometry: {
                type: "Point", 
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/tackpablo/image/upload/v1637610153/YelpCamp/gmd0kuahsh5tdacth5la.jpg',
                    filename: 'YelpCamp/gmd0kuahsh5tdacth5la',
                },
                {
                    url: 'https://res.cloudinary.com/tackpablo/image/upload/v1637610159/YelpCamp/pcwfim6h0shudkrcbd8h.jpg',
                    filename: 'YelpCamp/pcwfim6h0shudkrcbd8h',
                },
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

