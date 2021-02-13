import firebase from "./firebase.utility";

const db =()=>firebase.database();

class FireApi{

    getAll(){
        return db
    }

    create(yearToDate, weekToDate, dateId, data ){
        console.log(data)

        return db().ref("mealService").child(yearToDate).child(weekToDate).child(dateId).set(data)
    }

    get(references){
        return db().ref(references)
    }

}

export default new FireApi();