import firebase from "./firebase.utility";

const db =()=>firebase.database();

class FireApi{

    getAll(){
        return db
    }

    create(yearToDate, weekToDate, dateId, data ){

        return db().ref("mealService").child(yearToDate).child(weekToDate).child(dateId).set({data})
    }

    get(yearToDate, weekToDate, dateId){
        return db().ref('/mealService')
    }

}

export default new FireApi;