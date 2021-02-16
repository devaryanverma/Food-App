import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import MealList from '../Components/MealsList';
import {HeaderButton} from '../Components/HeaderButton';
import Colors from '../Constants/Colors';
import MealItem from '../Components/MealItem';

const FavoritesScreen = props => {
  
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

  
  const final = useSelector(state=>state.meals.favouritemeals); 
  if (final.length === 0) 
    {
      return(
      <View style = {styles.screen}
      ><Text style={styles.text}>No Favorite Meals Found</Text>
      <Text style={styles.text}>Start Adding some</Text>
      </View>
      );
    }
    else{
  return (
    <View style={styles.screen}>
      <FlatList
        data={final}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
}
};


FavoritesScreen.navigationOptions = navData =>{
  return {
   headerTitle: 'Your Favourites',
   headerStyle : {
     backgroundColor : Colors.primaryColor
   },
   headerLeft: () =>(
    <HeaderButtons HeaderButtonComponent = {HeaderButton}>
     <Item title='Menu' iconName="ios-menu" onPress={()=>{
       navData.navigation.toggleDrawer();
     }}/>
   </HeaderButtons>
   )}
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    
    backgroundColor: Colors.screenColor
  },
  text:{
    fontSize: 18,
    fontStyle:'italic',
    color:'#696969'
  }
});

export default FavoritesScreen;
