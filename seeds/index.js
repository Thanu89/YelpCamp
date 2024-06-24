const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '66701dda973de2e4c9be8415',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/yelp-camp/image/upload/v1718795414/YelpCamp/qm1qyrafgb8qr0siwmjt.jpg',
          filename: 'YelpCamp/qm1qyrafgb8qr0siwmjt',
        },
        {
          url: 'https://res.cloudinary.com/yelp-camp/image/upload/v1718795414/YelpCamp/mxqus4tggzbsswuuwi1c.jpg',
          filename: 'YelpCamp/mxqus4tggzbsswuuwi1c',
        },
        {
          url: 'https://res.cloudinary.com/yelp-camp/image/upload/v1718795415/YelpCamp/zzxbowd0tgacivnagwpo.jpg',
          filename: 'YelpCamp/zzxbowd0tgacivnagwpo',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi tempora debitis nulla reprehenderit ea possimus labore beatae minima, ducimus alias cum ad cupiditate itaque tempore dolorem voluptate error dolorum. Illo.',
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
