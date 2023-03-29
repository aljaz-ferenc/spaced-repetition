import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    addDoc,
    deleteDoc
} from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDY7I9h3H8h_Ur8UvwFF4iNnqJS0jQ_gII",
    authDomain: "spaced-repetition-ca8e7.firebaseapp.com",
    projectId: "spaced-repetition-ca8e7",
    storageBucket: "spaced-repetition-ca8e7.appspot.com",
    messagingSenderId: "876832063580",
    appId: "1:876832063580:web:f44d666950a60e608de699",
};

initializeApp(firebaseConfig);

const db = getFirestore();

export async function getDecks() {
    const decksRef = collection(db, "decks");
    let decks = []
    const response = await getDocs(decksRef)
    response.docs.forEach(item => decks.push(item.data().decks))
    return decks[0]
}

export async function addDeck(decks, newDeck) {
    const decksRef = doc(db, 'decks', 'LCv0dOEUO37aqs8JnSaS')
    await updateDoc(decksRef, (
        { decks: [...decks, newDeck] }
    ))
}

export async function deleteDeck(decks, deletedDeck) {
    const decksRef = doc(db, 'decks', 'LCv0dOEUO37aqs8JnSaS')
    const newDecks = decks.filter(deck => deck !== deletedDeck)
    await updateDoc(decksRef, (
        { decks: [...newDecks] }
    ))
}

export async function addCard(deck, question, answer) {
    const docRef = await addDoc(collection(db, 'cards'), {
        answer: answer,
        question: question,
        deck: deck,
        reviewTime: 0,
        state: 0
    })
}

export async function getAllCards(){
    const colRef = collection(db, 'cards')
    let cards = []
    const snapshot = await getDocs(colRef)
    snapshot.forEach(doc => {
        cards.push({...doc.data(), id:doc.id})
    })
    return cards
}

export async function removeCard(id){
    const docRef = doc(db, 'cards', id)
    deleteDoc(docRef)
}

export async function getCardsByDeck(deck) {
    const colRef = query(collection(db, 'cards'), where('deck', '==', deck))
    let cards = []
    const snapshot = await getDocs(colRef)
    snapshot.docs.forEach(doc => {
        cards.push({...doc.data(), id:doc.id})
    })
    return cards
}

export async function getCardsToReview(deck) {
    const q = query(collection(db, "cards"), where("reviewTime", "<", new Date().getTime()));
    let cards = [];
    const snapshot = await getDocs(q)
    snapshot.docs.forEach(doc => {
        cards.push({...doc.data(), id:doc.id})
    })
    return cards
}

export async function updateCard(id, state, reviewTime){
    const docRef = doc(db, 'cards', id)

    await updateDoc(docRef, {
        state,
        reviewTime
    })
}


