import * as React from 'react';
import { StyleSheet,TouchableOpacity,BackHandler, Text, View ,Image, FlatList, ActivityIndicator,Dimensions} from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
type props=StackNavigationProp<MainParamList>;
import axios from 'axios';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
export default class HomeScreen extends React.Component{
  dimensions=Dimensions.get('window');
   imageheight=Math.round(this.dimensions.width * 9/16);
   imagewidth=Dimensions.get('window');
   navigatin:any
    state = {
      ArticlesList:[],
      isLoading:true
          };   
    constructor(props:props) {
      super(props);
      this.navigatin= this.props;
    }
    async UNSAFE_componentWillMount(){
      this.getArticles()
       BackHandler.addEventListener('hardwareBackPress',this.handleBackButtonClick)
    }
    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress',this.handleBackButtonClick)
    }
    handleBackButtonClick=()=>{
      return true  
  }

    gotoDetails(item:any){
     this.navigatin['navigation']['navigate']('LINK DEVELOPMENT',{ArticlesListRouting:item});    
    }
    errorImage(item:any){
      item.urlToImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABs1BMVEVx4u////84xtknO3oSEUn/7bUoKCboz4lJSUipv77Z7ez80Ijdq2K3zsyOpaI4aJXs1JEuLi0qRH9U0+Nq4e4OADwhK3IvYpJhvtMzr8QpPnuTq6UWGlKFvLK62sL/z4PjqlsAAEJIQ0EAAD7z/P2X6fOD5fFHPTr/7rD/77iwx8Pi+PvE8viv7fUfAAD/9rsAADDo+vzS9fny0IIRAES/8fcnGRM/QEMwNDwdHyKh6/Q4yNoZL3YlNngAIm8AADpqytVblp1fpKtnwMojEw0mHxxXhIknDAAwfIZtaVygl3pfXVQSFx4CDhukk2Sdy7ZwycmC1+SU5OTjvXZPl7ZqjaskJ1NdcJLk5ekAHW1oaoNWWXaam6tQam02T1Fjs7w8YWRMVVUylKEyipbEt5Ddz6CHgGssVFmAemft3aqRglppYEU6Ny5UTjvZwoHFsHaJe1YuaHAAAAfl68K9zaW559azzKro4cW/uJ/11qHRsX7p4MLAuJ2PwsdVXIseU3UmepWoushyjagrj6ggX39EgKYogpxzgpAZOWGSr7o9RGRPYoxjcn9wg58vUofR1+GhqcC9X6rDAAAO2klEQVR4nO3d+V8URxYA8GmGQ0GIGVpEcWNQZnQ4BAYQBWZAEd0YdYNxAe8kq9moGzV7ZXdzYmK8FuFP3upjZvqo472qVwzZT94P+Xx2Nx+2v59X9V5VdU93xvl/j0yjL8B6/Cb89cc2CceHSqXhqREWM94/poZLpaGB7fm/tiwcGBoeyRdcURTyI8O2pfaEA6WRgJaRhf9v5EdK9ph2hONTeaUt4czkh8etXAu9cKA0g8FFmZmZEvnlUAsHpgpaunouC8PEA5ZSaMirKQvDhBdFKCzlCXhVZJ5uuBIJB0YyVLwQmZkiGq0kwiG69EWM7gxJcSUQlgr0vBBZGNoBQnu+wGg8IQ2Fdn2B0TCPRsIh677AaDQfDYQD+e3w+cYZg7qqLxzZLp9HdKe2XThE3P+UxozudNQUbtsAjRhntlFYstDgAUS9NOoIG5DA0KiTRrxwu2dgjJjBNw60cDtLKM+ILqpY4bb0eCkxb1U41GhfBj9SUcLhHQBk4aJW4xjhzM4AMuKIHWHDmkQ6MJMRLmx4jYmGWyAXDjTalAgXnBrgvzi+kxIYBnBHBRPuRCCUCBLuTGDGBREhwh0KBBIBwh0LhBHVwgE64IIXZH/NDzVRKSRqE4tnbh855sW5E0t3zp9doPmrLMyFJJdxdtexI0d2+fFua+vS0skTJ7+6S/KXM8rWrxJSrGQWdx3bVQsm9GPp3IlPKJDKBZxCSLEWPRPx1YU+8t2zBETFMlwunCIHRoUszi2ZG135DVWpsEQAvBsHJoTMeGfBmCg9g5MJSfpEApgSti6d+MTU6OoKCXyZ80dUQs/4laFRVlAlQpItfTKFPKF5HmXVRiw0noQLi3cXzyRTyBd6xjsmvUMyFYVCs0l49/yn/gomBRQJvd7ResaAiBcWDHzneTSVkMVJ/UWAuPGLhAad8IyYpxB6iVw6v6BHFHVFgdBgx/RpqrgghMGM1FoFiHZSAqH2GF2Q+wBCZmSjVQMpGKd8ofYYVQIhwla9dbngKJwr1K+jshmIEfqjtRtLhAvzusDbhMLWCweQRP4NVJ5Q+w5TcpVtJjz52SyWyLsrxRNq+jIZtQ8jXPr9bBOSyFufcoTa99AgKcQI/zzbhCTyig1HqF1mbtPmsLWVCbFZhAi1b9SrOwVSeKGpCUvkrGzSQu0UnlUXUpzw3IFZPFEt1H/WAtAqcMKTgRBFTD+rkRQabJpAgxQl/CwQ4ogqoX4KYdMQJfxTKMQQU0lMCvVTeNaiEJVFudBgW5g6czIWei0fT0z2xIRQ2wfshtpCBLEgE5qcPsEGqbYQTkycSsWFJocz9MLIPEQR82Khyd1eYCk1EIKJ8fOMmNDkDBi07EYKP4sLocT4+XBMaHJECmwWRkJwFkVCo1Pu2On2tBfGwnBdiifGak1UqH14kRSe+uLe/fsXd3GN6L2FBjF2nBERmp3j1xv+9IcPRovF4mjLBzwidn+oR+QLzZ6PrQmnPx8ttvgxevGUidDf4+sRo+uaiNCkGdaFDNhSjdH76ZGKO6fRJeZ5QsM7vqFw+os6sKWlWLx4alpXmC6lcKLLExo+xB1Wmg+LLbEYffBF3Ig4L+X7QMTIMK0LjSppVXjqQULYUhy9HzPChXcEKYQQI9W0LjS85euf0kzfG21JRXH0wed1I/xUXzANgVlMC01/SuGv2j7gAH1jy70PQyRYeCHd7xHE+vF3TWj6a5/FY7wxGk3kRYachgvflQGVxPqxYk1o1iv8vcX0RX4Kq8bRB/c+33X50unTAtPp05cuXar+j8mNBZaYTwmNHy1hQomvpnz85OGjv1y+7Fnqwf7T5cunv3x65cmVR5cDo7iSwohuUmj+i6bb8hRWjXvbvHj85MqVh0+fPn306BH758MrV548bqvGQ8+49JUihSpibSJWhebP6J2ZFk7CtFAaj7+8pKgzAGJtIlaFht2QxV1ICkHCtr0P/wpIoZxY64hVoXEK3QzABxS2tT2B+OTEQlxo/Bii+95xSmHbxB9MiW5caPoQGxQIFpoTqxv9DEmhca8CgXBh28SCGbFaakLhjBEw4/4NCEQI2/4OE4qI1RO3DM2KBppCjHACKBQR8zHhdg1SlPAjQ2JUaFhK3X9AgSjh76BCPtGNCg3XbO57VoTAaioihof7GYpm0Xghjxi2iwxJs7AzSjFCDjE8qwmEhttfS0JwpeETwzv6GZJ2aKeWAlu+iBg2xAzJzsK1IWzDAdPEmYjQtOE3dE0jJOYjQkMgYiIi1qXwdiggFiJC89//0K+80YM0RSQVgjsi+e5JRiTNIWyHj8mhFjBGdEmF0IYB3uPjmiGXSCuE7vKBQs0xGicSC4FEmNAEWCdSC9lALR4/rlKqhRMTE/e1h2iMSC7MuO7Vq1ddM+Hepo8+Qq7WhER6ofdHWfOXplEh1GnzQqIVofd3pYf7CuFeGmBItCWU9g25UL9HcImWhPJluFyIX2zLiNFVGyWQrQclSZQKJ0C3Y8DEqNB09xQPWbGRCc26YDqWCXfASaK42MiE92mBMaHhKUYqxONUIqQdowkh9WtXxeNULCSso2FEz2ko3kMTJ4rqqVA48U9qYNNwREjxIpoEUTAVhULqScgiel5q492yOCHZYiYS4xEh4TvZqiFY2oiE1FXGCycipF3UyIh8IfbwFxSzMSFty5cQuUL6MurFQkxo5RXBPCJXaCODTU0zMSF5uwiJqYrKEe61MQdZTMWE9O0iIL53vKgSUm16UxF/2sRCMQ2EhxPElPDj920JnZiQeP8UEXZ0tBQlwj17bAm7E0Li3UVU2LG3KBJ+vMeecDkhtFRqfGFHx/FikSP0fPaEUwmhnW8CVIUsjy0Bsi4MfPaEySdobaxqosKOwwzJlKGwyrModJJCG6uaqDBQdnREbFaFyymhlYmYEHqRBNoSTqWEViZiA4XpX5RYmYgNFDppoY2O2DjhMkdoY2naOCHv13lWdsENEzo8oYVh2jDhMldI/iUgt1Bq/+bwYanw/T33dn9HvwPm/9KZfpi2e/F1x2Gh8P09/9rtBbnQ4Qup716U2oP4+t+RREZ9/wl8u3d/R7zNXxYIaaupO9Jejwc1Y3R41mORVlgSCGmHaaE9Ft+Eg7Xq+3Z3LEiBs45ISHeDxnXd9mQEgzU+PO0QxW9vIfveSn5kOAUMB2tieNbju8WFplkvzIXiN/AQbKG6e6+9c/D7ca7PH6wff8v1eTE4eeiHH386MGvqXHbEQqNa09v7fP9cT89cOVtZFwqHng0Kgf/tb56c3Ldv8mWVqSmUvQlL98it99rzt56tnA1DKPzj3KqQeLQ5CI+5b+XnXw40aSG7HZlQZ11zbX/FS1w05p6JgPtzIuLgzcnmaHjOlz814Y3DUiG+YTxP6vyoiIDv5LICYtd8cyoY8me00ZELkQ3jWoXDY1Fe5RUbBmRCPnFwJQ0MkL/gxqrqzZCoJHa/7eH6vCRyio0H9IQ84uCLfr6wuXnfS1QakyCTN7T29vAT6Ccxxwf6Qh5RCPRmJOTH+WGkvuVh8Jbd3orQ5yG2uMBAmCIO3pQIWRrhxJQnLYQeKy4IRyi32HQGwFCYneuKCV9xyowWMf1BZN7roWEhHqHhOI0Vm87OV7Ecvujqi6bwpTSFTHgIJpzlcNL/FWxh845KmL3eGQV2dj6LzsO+rijxxVE5kM3Fn0FE2BvLQavTXsUY9ZL4djwK7Ox8Xq2l5TcMGCVOqoDNzfOQcbrA0eh+OeCgEpjN9mzFgJ2dVeHBriBCorcgVca+FYAQ+uUAwJMZ19Qp9AZjHOhPRSYsd3XFiKoyExJ/UhKXeRj+N0qUwrcQYHZuIwb0k8iEB/tixMHXgEHKZuJLpZBr4QtVC3BVp6jG9c0YMC30iF3KMhPEvAqI+AqLsthcm4MJy9+Pd8qFXX2Dh2DA5knFMOWOUaFQ8fTJfmWrCKPnlVIIKTOB8Ae5kC8RftFKPk6Bg9QLlbALCmxulnd95Bet5OO0Gy6c21DMQ1iZ8WNetscQjFGJUDZOAe2+FpXdUqF405QO6eJU5ND7OiBGWH4j7RaCfS9aqPF1QNlOESOMFZukEF5mFEKtLzxKpiJKmM1JcogBSoS89ShEKJyKOOHcM5Gw7ya8zMiEnD0TTChcguOE2TlhDoGrGZWQt+CGCUVdESksr/KFfSuoQSoUGnzxWFRtkMJs5RVP2IfpFBIh93tyYCH/w9xYYTnHzSHOJxIKWz1QyC2oWGGt2ESFfTeQKeQLu1UApZB3MIUWZsucHGKBXKESCBAOkAhXk8K+1yRC5eUDhJy2iBeGy9OIEFtmuMJZwfdjkcI0UUNY/j4u7IPue6VCABAkTBE1hNm5V1EhbkEqEkKAMGFyLuoI/b1wPYcawJQQBAQKE0QtYXmjLsTse4VC2JVDhawvuqY5ZMWmKtQoM0mhuk1ghVGinpDthatCzL6XL5Ttl3SFkZNwPSHbCwen+jmdMhMXqpZqesL6nUVNYTYXCjU6RVwo2dIbCWtHN7rC8ltfqAmsC/mH2xRCVlJdE2E26ws1gTUhrEvoCcPdlL4wx4S6KQyFiCmoJfS3/frC8v5cWRcYCOUbegqhM55x9YXZXE4byIRN3bgRqid0nBEDof4Y9W50Kw4syIROexZ4d41UOL/SrnOxWkLHeXYden+NStg/dkvvUjWFzpr4kTYrwvnXa5pXqit0nK2K1lDVEh7tX9e+Tn2h42zoDFUNofYANRY6a6t4I1rYP3ZDd4CaCx1n843gEVoqYf/YTSOfsdAz4vKIEjLfpukFGguZcfU6ouYghKbjk0zI5uMGvK5Chf3z8y8IfERCFls54ISECfvHVtaJroxKyAbrRkXy3DdG6KXPePrVgk7IYp3NSBVSJeyfH7uxTnlRpELHQ1YqUqVM2M+yR8tz6IUsNp/lrkd+AgUUMt3Yyi26wVkLC0IWa+sbuesVLpMj7O8/ynQv1vG7W0jYEXoxsLm16jETzkNJG8PdsJG7atgTBrG2vrXxhkErlZ45PyaPspj3Ymxs5eaNW+skTU8StoVhDKxtbq6vb7G45cX6+ubmmp1BmYptEjYwfhP++uM34a8//gdUmW1Os160VgAAAABJRU5ErkJggg=='
      this.setState({CourierTasks:this.state.ArticlesList })
    }
    async getArticles(){
      try{
      const response=await fetch('https://newsapi.org/v1/articles?source=the-next-web&apiKey=1c0f731cca954a13875e6965f9c7e9de');
      const json=await response.json(); 
      this.setState({ArticlesList:json.articles,isLoading:false})
      }
      catch(error){
        alert("please try again later")
        this.setState({isLoading:false})
      }


  }
    render() {
      if(this.state.isLoading){
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
    <View style={styles.container}>
 <FlatList 
          data={this.state.ArticlesList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback onPress={() => this.gotoDetails(item)}>
              <View style={styles.Articleslist}>
               <View style={{flex:1,flexDirection:'column',backgroundColor:'white',width:this.imagewidth.width}}>
                    <Image style={{height:this.imageheight,width:this.imagewidth.width,resizeMode:'stretch'}}
                           source={{uri: item['urlToImage']}}  onError={()=> {this.errorImage(item)}}/>
               <Text style={{fontSize:18,color:'#5a5b5c',textAlign:'left',paddingLeft:10}}>{item['title']}</Text>
               <Text style={{fontSize:14,color:'gray',textAlign:'left',paddingLeft:10}}>By {item['author']}</Text>
               <Text style={{fontSize:14,color:'gray',alignSelf:'flex-end',paddingRight:25}}>{new Date(item['publishedAt']).toDateString()}</Text>

                 </View>
                 </View>
                 </TouchableWithoutFeedback>
            )}}/>
    </View>
  );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e3e3e3',
    paddingLeft:10,
    paddingRight:10
  },
  loginText: {
    color: 'white',
    fontWeight:'bold'
  },
  
    loginButton: {
      backgroundColor: "#00b5ec",
  
      shadowColor: "#808080",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.50,
      shadowRadius: 12.35,
  
      elevation: 19,
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
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:30,
    backgroundColor:'transparent'
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
});
