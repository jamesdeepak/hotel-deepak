// knowledge_base.js
const hotelData = {
    menu: [
        {
            id: 1,
            name: "Deepak Special Pot Biryani",
            category: "biryani",
            price: "₹350",
            description: "Slow-cooked saffron rice with tender mutton delicately spiced.",
            image: "./images/biryani_pot.jpg",
            keywords: ["special", "signature", "best", "mutton", "pot"]
        },
        {
            id: 2,
            name: "Hyderabadi Chicken Dum Biryani",
            category: "biryani",
            price: "₹280",
            description: "Classic Hyderabadi style with aromatic spices and chicken.",
            image: "./images/chicken_dum.jpg",
            keywords: ["chicken", "dum", "hyderabadi", "spicy"]
        },
        {
            id: 3,
            name: "Paneer Tikka Starter",
            category: "starters",
            price: "₹220",
            description: "Char-grilled cottage cheese marinated in yogurt and spices.",
            image: "./images/paneer_tikka.jpg",
            keywords: ["paneer", "veg", "starter", "tikka"]
        },
        {
            id: 4,
            name: "Double Ka Meetha",
            category: "desserts",
            price: "₹150",
            description: "Traditional bread pudding fried in ghee and soaked in milk.",
            image: "./images/dessert.jpg",
            keywords: ["dessert", "sweet", "double", "meetha"]
        }
    ],
    faq: [
        {
            question: "What are your opening hours?",
            answer: "We are open from 11:00 AM to 11:00 PM every day.",
            keywords: ["time", "open", "hours", "close"]
        },
        {
            question: "Where is Hotel Deepak located?",
            answer: "We are located at 123, Food Street, Near Central Plaza.",
            keywords: ["location", "address", "where", "place"]
        },
        {
            question: "Do you have vegetarian options?",
            answer: "Yes! We have a wide range of Veg Biryanis, Paneer starters, and Curries.",
            keywords: ["veg", "vegetarian", "green"]
        }
    ]
};

// Flatten data for RAG
const ragCorpus = [
    ...hotelData.menu.map(item => ({
        text: `${item.name} - ${item.description}. Price: ${item.price}. Category: ${item.category}`,
        answer: `You should try our ${item.name}! It's ${item.description} for just ${item.price}.`,
        keywords: item.keywords
    })),
    ...hotelData.faq.map(item => ({
        text: item.question,
        answer: item.answer,
        keywords: item.keywords
    }))
];
