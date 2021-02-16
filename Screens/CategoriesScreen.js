import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../Components/ComponentGridTile';
import {HeaderButton} from '../Components/HeaderButton';
import Colors from '../Constants/Colors';

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
    <FlatList
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
    </View>
  );
};

CategoriesScreen.navigationOptions = navData =>{
  return {
   headerTitle: 'Meals Categories',
   headerStyle : {
     backgroundColor : Colors.primaryColor
   },
   headerLeft: (
    <HeaderButtons HeaderButtonComponent = {HeaderButton}>
     <Item title='menu' iconName="ios-menu"  onPress={()=>{
       navData.navigation.toggleDrawer();
     }}/>
   </HeaderButtons>
   )
};
};



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenColor,
  }
});

export default CategoriesScreen;
