// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBuE7ZlexxZD4Dy11z5OrOVlCVUtFG5oOA",
    authDomain: "datasaver-42281.firebaseapp.com",
    databaseURL: "https://datasaver-42281.firebaseio.com",
    projectId: "datasaver-42281",
    storageBucket: "datasaver-42281.appspot.com",
    messagingSenderId: "887361647383",
    appId: "1:887361647383:web:e3824a496b6486e060bd52",
    measurementId: "G-370H79VF2M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.firestore();
const saveBtn = document.getElementById('save');
const deleteBtn = document.getElementById('delete');
const mytable = document.getElementById('example');
const mydata = {
    location: '',
    deaths: '',
    confirmed: '',
    active: '',
    recovered: ''

}
let ids = []


deleteBtn.addEventListener('click', e => {
    e.preventDefault();
    getData()
})
saveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    for (let row of mytable.rows) {
        // for (let cell of row.cells) {
        mydata.location = row.cells[0].innerText
        mydata.deaths = row.cells[1].innerText
        mydata.confirmed = row.cells[2].innerText
        mydata.active = row.cells[3].innerText
        mydata.recovered = row.cells[4].innerText

        saveData(mydata.location, mydata.deaths, mydata.confirmed, mydata.active, mydata.recovered)
        // console.log(cell.innerText)
        // }

        // console.log('{' + mydata.location + ',' + mydata.deaths + ',' + mydata.confirmed + ',' + mydata.active + ',' + mydata.recovered + '}');
    }
})

function saveData(L, D, C, A, R) {

    let data = {
        location: L,
        deaths: D,
        confirmed: C,
        active: A,
        recovered: R
    }
    let db = firebase.firestore().collection("Current/");
    // for (let i = 0; i < mydata.length; i++)
    db.add(data);


}

function getData() {
    database.collection("Current/").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {

            ids.push(doc.id)

        })
    })
    deleted(ids)
}

function deleted(ids) {
    for (let i = 0; i < ids.length; i++)
        database.collection("Current/").doc(ids[i]).delete();

}