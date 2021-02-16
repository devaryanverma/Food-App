import React, { useState, useEffect} from 'react';
import { useCallback } from 'react';
import { View, Text, StyleSheet, Switch} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../Components/HeaderButton';
import Colors from '../Constants/Colors';
import { setFilters} from '../Store/MealsAction'; 

const FilterSwitch = props => {
  return(
    <View style={styles.filter}>
      <Text style={styles.head}>{props.Heading}</Text>
      <Switch thumbColor={Colors.accentColor} 
      value={props.state}
      onValueChange={props.onChange} />
  </View>);
};

const FiltersScreen = props => {
  const { navigation } = props;
  const [glutenFree,setGlutenFree]= useState(false);
  const [veganFree,setVeganFree]= useState(false);
  const [lactoseFree,setLactoseFree]= useState(false);
  const [vegFree,setVegFree]= useState(false);

  const dispatch = useDispatch();

  const filterSaver=useCallback(()=>{
    const appliedFilters={
      gluten:glutenFree,
      vegan:veganFree,
      lactose:lactoseFree,
      veg:vegFree
    };
  
  dispatch(setFilters(appliedFilters))}
  ,[glutenFree,vegFree,veganFree,lactoseFree,dispatch]);

  useEffect(()=>{
    navigation.setParams({save: filterSaver});
  },[filterSaver]
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch Heading='Gluten-Free'state= {glutenFree} onChange={setGlutenFree}/>
      <FilterSwitch Heading='Lactose-Free'state= {lactoseFree} onChange={setLactoseFree}/>
      <FilterSwitch Heading='Vegan'state= {veganFree} onChange={setVeganFree}/>
      <FilterSwitch Heading='Vegetarian'state= {vegFree} onChange={setVegFree}/>
    </View>
  );
};

FiltersScreen.navigationOptions = navData =>{
  return {
   headerTitle: 'Filter Screen',
   headerStyle : {
     backgroundColor : Colors.primaryColor
   },
   headerLeft: () =>(
    <HeaderButtons HeaderButtonComponent = {HeaderButton}>
     <Item title='Menu' iconName="ios-menu" onPress={()=>{
       navData.navigation.toggleDrawer();
     }}/>
   </HeaderButtons>
   ),
   headerRight: () =>(
    <HeaderButtons HeaderButtonComponent = {HeaderButton}>
     <Item title='Menu' iconName="ios-save" onPress={navData.navigation.getParam('save')}/>
    </HeaderButtons>
   )
  }
};

const styles = StyleSheet.create({
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    textAlign:'center',
    padding: 10
  },
  screen:{
    flex: 1,
    backgroundColor: Colors.screenColor
  },
  head:{
    fontSize: 16
  },
  filter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal : 15,
    marginVertical: 8
  }
});

export default FiltersScreen;
