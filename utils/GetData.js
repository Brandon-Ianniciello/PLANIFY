import * as firebase from 'firebase';

getEvent = async (tableName) => {
    const db = firebase.firestore();
    const response = db.collection(tableName);
    const data = await response.get();

    let tab = []

    data.docs.forEach(item => {
        tab.push(item.data())
    })

    return tab
}

export default getEvent;