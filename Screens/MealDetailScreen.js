import React, {useEffect, useCallback} from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from "react-redux";

import Colors from '../Constants/Colors';
import HeaderButton from '../Components/HeaderButton';
import Card from '../Components/Card';
import { toggleFavourite } from '../Store/MealsAction';

const MealDetailScreen = props => {
  
  const mealId = props.navigation.getParam('mealId');
  const availableMeals= useSelector(state=>state.meals.meals);
  const Favourite = useSelector(state=>state.meals.favouritemeals.some(meal=>meal.id === mealId));

  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavDispatch = useCallback(() => {
    dispatch(toggleFavourite(mealId)); 
  },[dispatch , mealId]);
  useEffect(()=>{
    props.navigation.setParams({toggle: toggleFavDispatch})
  }, [toggleFavDispatch]
  );
  useEffect(()=>{
    props.navigation.setParams({isFav: Favourite})
  }, [Favourite]
  );
 // props.navigation.setParams({toggle: toggleFavDispatch});

  return (
    <ScrollView style={styles.all}>
    <View style={styles.imageTop}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image}/>
    </View>
    <View style={styles.title}>
            <Text style={styles.text}>{selectedMeal.duration}m</Text>
            <Text style={styles.text}>{selectedMeal.complexity.toUpperCase()}</Text>
            <Text style={styles.text}>{selectedMeal.affordability.toUpperCase()}</Text>
    </View> 
    <Card>
    <Text style={styles.subHeading}>List Of Ingredients</Text>
    <View style={styles.inside}>
    {selectedMeal.ingredients.map(ingredient=>(
    <Text key={ingredient} style={styles.in}>{ingredient}</Text>
    ))}
    </View>
    </Card>
    <Card>
    <Text style={styles.subHeading}>Steps</Text>
    <View style={styles.inside}>
    {selectedMeal.steps.map(step=>(
    <Text key={step} style={styles.in}>{step}</Text>
    ))}
    </View>
    </Card>
      </ScrollView>
      
       );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealTitle= navigationData.navigation.getParam('mealTitle')
  //const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const Fav = navigationData.navigation.getParam('toggle');
  const Star = navigationData.navigation.getParam('isFav')
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName= {Star ? 'ios-star' : 'ios-star-outline'}
          onPress={Fav}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image:{
    width: '100%',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  all:{
    
    backgroundColor: Colors.screenColor
  },
  in:{
    paddingTop: 5,
    paddingLeft:5,
    paddingRight:5
  },
  imageTop:{
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  inside:{
    borderColor: 'black',
    borderWidth: 1,
    padding:5,
    paddingLeft:10,
    margin: 10,
    marginTop:5,
    borderRadius: 10
  },
  title:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    padding: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.accentColor
  },
  text:{
    fontWeight: 'bold'
  },
  subHeading:{
    fontWeight: 'bold',
    fontSize: 22,
    textAlign:'center',
    padding: 10
  }
});

export default MealDetailScreen;
