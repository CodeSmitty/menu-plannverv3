



export const createData = (dateId, yearToDate, weekToDate, filtered, url, state)=>{
return {
  mealId: dateId ||null,
  year: yearToDate || null,
  week:weekToDate || null,
  serviceType: filtered || null,
  image: url || null,
  mealItems: [
    {
      entre: state?.entre?.value,
      type: "entre",
      diets: [
        { veg: state?.entre.veg, type: "vegetarian" },
        {
          glut: state?.entre?.glut,
          type: "gluten_free",
        },
        {
          dairy: state?.entre?.dairy,
          type: "dairy_free",
        },
      ],
    },
    {
      sideOne: state?.sideOne?.value,
      type: "side",
      diets: [
        { veg: state?.sideOne.veg, type: "vegetarian" },
        {
          glut: state?.sideOne?.glut,
          type: "gluten_free",
        },
        {
          dairy: state?.sideOne?.dairy,
          type: "dairy_free",
        },
      ],
    },
    {
      sideTwo: state?.sideTwo?.value,
      type: "side",
      diets: [
        { veg: state?.sideTwo.veg, type: "vegetarian" },
        {
          glut: state?.sideTwo?.glut,
          type: "gluten_free",
        },
        {
          dairy: state?.sideTwo?.dairy,
          type: "dairy_free",
        },
      ],
    },
    {
      description: state?.description?.value,
      type: "other",
      diets: [
        {
          veg: state?.description.veg,
          type: "vegetarian",
        },
        {
          glut: state?.description?.glut,
          type: "gluten_free",
        },
        {
          dairy: state?.description?.dairy,
          type: "dairy_free",
        },
      ],
    },
  ],
};



}

