import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './Mealitem/MealItem';
import { useEffect,useState } from 'react';
const AvailableMeals = ()=>{
  const [meals,setMeals] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [haveError,setHaveError]= useState()
  useEffect(()=>{
    const fetchMeals = async () =>{
      const response = await fetch('https://react-restaurant-http-default-rtdb.firebaseio.com/meals.json')
      if(!response.ok){
        throw new Error("Algo está errado")
      }
      
      const responseData = await response.json()
      const loadedMeals = [];
      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false);
    }
    
    fetchMeals().catch((error)=>{
      setIsLoading(false)
      // console.log("erro: " + error)
      setHaveError(error.message);  
    })
  },[])
  
  if(isLoading){
    return  (
    <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  )}
  if(haveError){
    return(
      <section className={classes.MealsError}>
        <p>{haveError}</p>
      </section>  
    )
  }
  const mealsList = meals.map(meal => 
    <MealItem 
      key={meal.id} 
      name={meal.name} 
      description={meal.description} 
      price={meal.price} 
      id={meal.id}  
    />)
  return <section className={classes.meals}>
    <Card>
      <ul>
        {mealsList}
      </ul>
    </Card>
  </section>

}

export default AvailableMeals