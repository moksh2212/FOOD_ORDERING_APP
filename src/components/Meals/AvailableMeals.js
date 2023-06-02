import React,{useEffect,useState} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const AvailableMeals = () => {
  
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [filterVal,setfilterVal]=useState('');
  const [searchApiData,setSearchApidata]=useState([]);


  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-8aaef-default-rtdb.firebaseio.com/Meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
        
      }
     
      setMeals(loadedMeals);
      setSearchApidata(loadedMeals);
      setIsLoading(false);

    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
  
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
    
  ));
  const handlefilter=(e)=>{
    if(e.target.value === '' ) {
       setMeals(searchApiData)
       setfilterVal(e.target.value);
    }
    else {
     
      const filterresult= searchApiData.filter((item)=>item.name.toLowerCase().includes(e.target.value.toLowerCase()) ) ;
      if (filterresult.length>0) {
        setMeals(filterresult)
        setfilterVal(e.target.value);
      }
      else {
        setMeals([]);
        setfilterVal('');
        
      }
    }
   
    }
    
  return (
  
    <section className={classes.meals}>
      <body className={classes.body}>
    <div className={classes.box}>
    <form className={classes.search}>
      <input className={classes.input} onmouseout="this.value = ''; this.blur();" value={filterVal} onChange={(e)=>handlefilter(e)}/>
      </form>
      <FontAwesomeIcon className={classes.faSearch} icon={faSearch} />
    </div>
    </body>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
    
  );
  
};

export default AvailableMeals;