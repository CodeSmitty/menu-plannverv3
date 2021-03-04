import firebase from "./firebase.utility";

const db =()=>firebase.database();

class FireApi{

    getAll(){
        return db
    }

    create(yearToDate, weekToDate, dateId, data ){
            

        return db().ref("mealService").child(yearToDate).child(weekToDate).child(dateId).set(data)
    }

    get(references){
        let newData;

       return new Promise((resolve, reject)=>{
            db().ref(references).once('value', snap =>{
                resolve(snap.val())
            })
        }).then(data=>data)
       
    }

    

}

export default new FireApi();