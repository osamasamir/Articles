import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider ,useSafeAreaFrame} from 'react-native-safe-area-context';
 import Animated, { color } from 'react-native-reanimated';
import MainStackNavigator from './navigation/Stack';
import HomeScreen from './screens/HomeScreen';
const Drawer=createDrawerNavigator();
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './screens/DetailsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
const Stack=createStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
              <Stack.Navigator>
              <Stack.Screen name="Root" component={Root} options={{headerShown:false}}/>
              <Stack.Screen name="LINK DEVELOPMENT" component={DetailsScreen}
              options={{headerTitleStyle:styles.Title,
                headerTintColor:'white',
                headerStyle:{backgroundColor:'black'}}}/>
              </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>

  );
}
function Root(){
  return (
    <SafeAreaView style={{ flex: 1,
      paddingTop: Platform.OS === 'android' ? 0 : 0    
    }} >
       <Drawer.Navigator  screenOptions={{drawerStyle:{backgroundColor:'#e6e6e6'}}}>
      <Drawer.Screen  name="Home" component={HomeScreen} 
       options={{
        headerShown:true,
        headerTintColor:'white',
        headerStyle:{backgroundColor:'black'},
        title:"",
        headerTitle:'LINK DEVELOPMENT',
        headerTitleStyle:styles.Title,
        drawerLabel:lab=>
        <Text style={{textAlign:'left'}}>
        <Text style={{fontSize:10,textAlign:'left',color:'gray'}}>welcome</Text>
        <Text style={{fontSize:14,textAlign:'left'}}>{"\n"}Tony Roshdy</Text>
        <Image  style={styles.Menuimagearrow}
        source={require('./assets/images/arrow.png')}></Image>
        </Text>,
        drawerIcon: config => 
        <Image  style={styles.Menuimageprofile}
        source={require('./assets/images/profile.png')}></Image>,
        headerRight:()=>

          <View style={{paddingRight:10}}>
          <FontAwesome size={25} style={{ color:'white',textAlignVertical:'center' }} name="search" />
          </View>
          ,
        headerTitleAlign:"left",headerStatusBarHeight:0,
   }}/>
      <Drawer.Screen  name="Explore" component={ExploreScreen}
      options={{
        title:'Explore',
        headerTintColor:'white',
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle:styles.Title,
        drawerIcon: config => 
        <Image  style={styles.Menuimage}
        source={require('./assets/images/explore.png')}></Image>
              }}/>
      <Drawer.Screen  name="Chat" component={LiveChatScreen}
      options={{
        title:'Live Chat',
        headerTintColor:'white',
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle:styles.Title,
        drawerIcon: config => 
        <Image  style={styles.Menuimage}
        source={require('./assets/images/live.png')}></Image>
              }}/>

<Drawer.Screen  name="Gallery" component={GalleryScreen}
      options={{
        title:'Gallery',
        headerTintColor:'white',
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle:styles.Title,
        drawerIcon: config => 
        <Image  style={styles.Menuimage}
        source={require('./assets/images/gallery.png')}></Image>
              }}/>

<Drawer.Screen  name="WishList" component={WishListScreen}
      options={{
        title:'Wish List',
        headerTintColor:'white',
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle:styles.Title,
        drawerIcon: config => 
        <Image  style={styles.Menuimage}
        source={require('./assets/images/wishlist.png')}></Image>
              }}/>

<Drawer.Screen  name="Emagazine" component={EmagazineScreen}
      options={{
        title:'E-Magazine',
        headerTintColor:'white',
        headerStyle:{backgroundColor:'black'},
        headerTitleStyle:styles.Title,
        drawerIcon: config => 
        <Image  style={styles.Menuimage}
        source={require('./assets/images/e-magazine.png')}></Image>
              }}/>

      </Drawer.Navigator> 
      </SafeAreaView>
  )
}

function ExploreScreen (){
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20}}>Explore Page</Text>
    </View>
  )
}
function LiveChatScreen (){
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20}}>Live Chat Page</Text>
    </View>
  )
}
function GalleryScreen (){
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20}}>Gallery Page</Text>
    </View>
  )
}
function WishListScreen (){
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20}}>Wish List Page</Text>
    </View>
  )
}
function EmagazineScreen (){
  return(
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontSize:20}}>E-MagazineScreen Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  headerexpolre:{
    fontSize:14,
  },
  Menuimage: {
    width: 20,
    height: 20,
  },
  Menuimageprofile:{
    width: 40,
    height: 40,
    marginLeft:20
  },
  Menuimagearrow:{
    width: 15,
    height: 15,
    marginLeft:50
  },
  Title:{
    fontSize:18,
    color:'white'
  }
});
