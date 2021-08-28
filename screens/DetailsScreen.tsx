import * as React from 'react';
import { StyleSheet,TouchableOpacity,BackHandler, Text, View ,Image, FlatList, ActivityIndicator,Dimensions, ScrollView} from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
type props=StackNavigationProp<MainParamList>;

  export default class DetailsScreen extends React.Component{
    dimensions=Dimensions.get('window');
    imageheight=Math.round(this.dimensions.width * 9/16);
    imagewidth=Dimensions.get('window');
 
    navigatin:any
    ArticlesList=null
    isLoading=true
    dateofpublish1:any
    dateofpublish2:any
    constructor(props:props) {
      super(props);
      this.navigatin= this.props;
      console.log("Details")
      if(this.navigatin['route']['params']['ArticlesListRouting'] != null || this.navigatin['route']['params']['ArticlesListRouting'] != undefined){
        this.isLoading=false
        this.ArticlesList=this.navigatin['route']['params']['ArticlesListRouting']
        if(this.ArticlesList?.['publishedAt'] != null){
          this.dateofpublish1=this.ArticlesList?.['publishedAt']
          this.dateofpublish2=new Date(this.dateofpublish1).toDateString();
        }
      }
      else{
        this.isLoading=true
        this.navigatin['navigation']['navigate']('HomeScreen');
      }
  }
  render() {
    if(this.isLoading){
      return(
       <View style={{flexDirection: 'column',flex:1}}>
         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
         <Image  style={styles.witingApp}
                   source={require('../assets/appicon.png')}/>
         <ActivityIndicator  
     color="#2F80ED" size="large">
     </ActivityIndicator>
     </View>
     
</View>
      )

     }
     else{
return (
  <ScrollView >

<View style={{flex:1}}>
             <View style={{flex:1,flexDirection:'column',paddingTop:10,paddingBottom:20,
             backgroundColor:'white',width:this.imagewidth.width}}>
                 <View style={{flex:1,flexDirection:'column'}}>
                  <Image style={{height:this.imageheight,width:this.imagewidth.width,resizeMode:'stretch'}}
                         source={{uri:this.ArticlesList?.['urlToImage']}}/>
                 <Text style={{position:'absolute',paddingTop:'40%',fontSize:14,color:'white',alignSelf:'flex-end',paddingRight:10}}>{this.dateofpublish2}</Text>

                                 </View>
                           <Text style={{fontSize:18,color:'#5a5b5c',textAlign:'left',paddingLeft:10,paddingTop:10}}>{this.ArticlesList?.['title']}</Text>
               <Text style={{fontSize:14,color:'gray',textAlign:'left',paddingLeft:10}}>By {this.ArticlesList?.['author']}</Text>
             <Text style={{fontSize:14,color:'gray',textAlign:'left',paddingLeft:10,paddingTop:15,paddingBottom:20}}>{this.ArticlesList?.['description']}</Text>

             </View>
               
                   <TouchableOpacity   style={[styles.buttonContainer, styles.loginButton ]} >
            <Text style={styles.loginText}>OPEN WEBSITE</Text>
          </TouchableOpacity>
                   </View>
                </ScrollView>
);
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor:'#e3e3e3',
    // marginLeft:10,
    // marginRight:10,
    paddingLeft:10,
    paddingRight:10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  Articleslist: {
    marginBottom:5,
    paddingRight:10,
    marginTop:5,
    flexDirection: 'column',
  },
  witingApp: {
    width: 80,
    height: 80,
    borderRadius: 43,
    borderWidth: 1,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    marginRight:20,
    marginLeft:20,
    marginTop:20
  },
  loginButton: {
    backgroundColor: "black",
  },
  loginText: {
    color: 'white',
    fontWeight:'bold'
  },
});
