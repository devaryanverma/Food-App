import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {useSelector} from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealItem from '../Components/MealItem';
import Colors from '../Constants/Colors';


const CategoryMealScreen = props => {
  const renderMealItem = itemData => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title
            }
          });
        }}
      />
    );
  };

  const catId = props.navigation.getParam('categoryId');
  const availableMeals = useSelector(state=>state.meals.filteredmeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  if(displayedMeals.length === 0)
  {
    return(
      <View style={styles.screen}>
        <Text style={styles.text}> No meal found, Maybe check your filters?</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.screenColor
  },
  mainText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  text:{
    fontSize: 18,
    fontStyle:'italic',
    color: "#696969"
  }
});

export default CategoryMealScreen;
