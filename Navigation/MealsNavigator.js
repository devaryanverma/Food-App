import React from 'react';
import { Platform , Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerView} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryMealsScreen from '../Screens/CategoryMealsScreen';
import MealDetailScreen from '../Screens/MealDetailScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import Colors from '../Constants/Colors';
import FiltersScreen from '../Screens/FiltersScreen';
import { Drawer } from 'react-native-paper';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: { 
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      headerTitle: 'A Screen'
    }
  }
);

const FavTabNav = createStackNavigator(
{
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
},
{
defaultNavigationOptions: {
   headerStyle: {
  backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
},
headerTintColor:
Platform.OS === 'android' ? 'white' : Colors.primaryColor,
headerTitle: 'A Screen'
}
}
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavTabNav,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.accentColor
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor
        }
      });
const FltrScrn = createStackNavigator({
  Filter: FiltersScreen
},
{
  defaultNavigationOptions: { 
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor:
      Platform.OS === 'android' ? 'white' : Colors.primaryColor
  }
}
)
const MainNavigator= createDrawerNavigator({
  Main : { 
    screen : MealsFavTabNavigator,
    navigationOptions:{drawerLabel:'Meals'}},
    Filter : FltrScrn
},
{
  contentOptions:{
    activeTintColor: Colors.accentColor,
    activeBackgroundColor: Colors.screenColor,
}

})

export default createAppContainer(MainNavigator);
