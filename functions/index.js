const functions = require('firebase-functions');
const cors = require("cors");
const admin = require('firebase-admin')
const serviceAccount = require("./serviceAccountKey.json");
const Config = require('./config');
const stripe = require('stripe')(Config.STRIPE_SECRET_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "NEXT_PUBLIC_FIREBASE_APP_APIS"
});

const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(body)
    })
}

const db = admin.firestore();

exports.getHamburger = functions.https.onRequest((request, response) => {
    const hamburgerRef = db.collection("hamburger").get()
    if (hamburgerRef) {
        db.collection("hamburger")
        .get()
        .then((query) => {
            const hamburgers = [];
            query.forEach((doc) => {
                const data = doc.data();
                hamburgers.push({
                    "id": doc.id,
                    "category": data.category,
                    "images": data.images.path,
                    "name": data.name,
                    "orderBy": data.orderBy,
                    "price": data.price,
                    "stock":data.stock,
                });
            });
            response.json(hamburgers);
        })
        .catch((error)=>{
            response.send(error);
        });   
    } else {
        const hamburgers = [];
        response.json(hamburgers);
    }
});

exports.getSetMenu = functions.https.onRequest((request, response) => {
    const setMenuRef = db.collection("setMenu").get()
    if (setMenuRef) {
        setMenuRef.then((query) => {
            const setMenus = [];
            query.forEach((doc) => {
                const data = doc.data();
                setMenus.push({
                    "id": doc.id,
                    "category": data.category,
                    "images": data.images.path,
                    "name": data.name,
                    "orderBy": data.orderBy,
                    "price": data.price,
                    "stock":data.stock,
                });
            });
            response.json(setMenus);
        })
        .catch((error)=>{
            response.send(error);
        });   
    } else {
        const setMenus = [];
        response.json(setMenus);
    }
});

exports.getSideMenu = functions.https.onRequest((request, response) => {
    const sideMenuRef = db.collection("sideMenu").get()
    if (sideMenuRef) {
        sideMenuRef.then((query) => {
            const sideMenu = [];
            query.forEach((doc) => {
                const data = doc.data();
                sideMenu.push({
                    "id": doc.id,
                    "category": data.category,
                    "images": data.images.path,
                    "name": data.name,
                    "orderBy": data.orderBy,
                    "price": data.price,
                    "stock":data.stock,
                });
            });
            response.json(sideMenu);
        })
        .catch((error)=>{
            response.send(error);
        });   
    } else {
        const sideMenu = [];
        response.json(sideMenu);
    }
});

exports.getDrink = functions.https.onRequest((request, response) => {
    const drinkRef = db.collection("drink").get()
    if (drinkRef) {
        drinkRef.then((query) => {
            const drinks = [];
            query.forEach((doc) => {
                const data = doc.data();
                drinks.push({
                    "id": doc.id,
                    "category": data.category,
                    "name": data.name,
                    "orderBy": data.orderBy,
                    "price": data.price,
                    "stock":data.stock,
                });
            });
            response.json(drinks);
        })
        .catch((error)=>{
            response.send(error);
        });        
    } else {
        const drinks = [];
        response.json(drinks);
    }
});

exports.stripePaymentMethods = functions.https.onRequest((req, res) => {
    const corsHandler = cors({ origin: true });
    corsHandler(req, res, () => {
        if (req.method !== 'POST') {
            sendResponse(res, 405, { error: "Invalid Request" })
        }
        return stripe.paymentIntents.create({
            amount:req.body.amount,
            currency: "JPY",
            description: "Tbilisi Burger",
            payment_method: req.body.id,
            confirm: true
        }).then(() => {
            sendResponse(res, 200, {confirm: "completed"});
        }).catch((error) => {
            console.error(error);
            sendResponse(res, 500, { error: error })
        })
    })
})