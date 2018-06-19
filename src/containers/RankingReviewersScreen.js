import React, { Component } from 'react'
import { View, StyleSheet, YellowBox, Alert, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import { UltimateListView, UltimateRefreshView } from 'react-native-ultimate-listview'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import RankingService from '../provider/ranking/RankingService';
import FollowsService from '../provider/follows/FollowsService';
import UserService from '../provider/user/UserService';
import store from '../store';
import {connect} from 'react-redux';
import { saveRankingReviewers } from '../actions';
const windowHeight = Dimensions.get('window').height
import userUrl from '../images/user.jpeg';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

class RankingReviewersScreen extends Component {
  static navigationOptions = {
    headerLeft: null,
    header: null,
  };

  state = {
    isLoading:false,
    limit:10,
    isLoadingFetchData:false,
  }

  componentWillMount () {
    console.log('pasa');
    this.getTopReviewersToProps();
  }

  getTopReviewersToProps () {
    addPath = "?page=1&limit="+this.state.limit;
    RankingService.getTopReviewers(addPath, response => {
        store.dispatch(saveRankingReviewers({reviewers:response.data}));
        console.log('this.props ', this.props);
        if(this.state.isLoading == false) {
            this.setState({isLoading:true});
        } else {
          setTimeout ( () => {
              this.setState({isLoadingFetchData:false});
          }, 4000);
        }

        //store.dispatch(saveUser(user));
    }, (err) => {
        console.log('user login ERROR', err);
    });
  }

  onReloadMoreData = () => {
    this.setState({isLoadingFetchData:true});
  }

  renderReloadMoreData () {
    if(this.state.isLoadingFetchData){
      return (
        <View style={{flex: 1, justifyContent: 'center', padding: 10 }}>
          <ActivityIndicator size="large" color='#62a1f1'/>
        </View>
      );
    }
  }

  detectScroll (e) {
    height = e.nativeEvent.contentSize.height,
    offset = e.nativeEvent.contentOffset.y;

    if( windowHeight + offset >= height && this.state.isLoadingFetchData!==true){
      this.setState({limit:this.state.limit+5});
      this.onReloadMoreData();
      this.getTopReviewersToProps();
    }
  }

  followUser(user) {
    UserService.getUser(user, response => {
        var User = {
          user_to_follow: {}
        }
        User.user_to_follow = response.data;

        FollowsService.followUser(User, response => {
          console.log('response ', response);
          this.getTopReviewersToProps();
        }, (err) => {
              console.log('user login ERROR', err);
        });

    }, (err) => {
       console.log('user login ERROR', err);
    });

  }
  unfollowUser (user) {
      var User = {
        user_to_unfollow:user
      }
      FollowsService.unfollowUser(User, response => {
        console.log('response ', response);
        this.getTopReviewersToProps();
      }, (err) => {
          console.log('user login ERROR', err);
      });
  }

  renderButtonFollow (reviewers) {
    if(!reviewers.iAmFollow) {
      return (
        <Button light onPress={this.followUser.bind(this,reviewers._id)}>
           <Text> Seguir </Text>
       </Button>
      )
    } else {
      return (
        <Button primary onPress={this.unfollowUser.bind(this,reviewers._id)}>
           <Text> Siguiendo </Text>
       </Button>
      )
    }
  }

  render() {
    if (this.state.isLoading) {
      let { rankings } = this.props;
      console.log('rankings ', rankings.reviewers);
      return (
        <ScrollView onScrollEndDrag={this.detectScroll.bind(this)}>
           <Content>
           <List dataArray={rankings.reviewers}
             renderRow={(reviewers) =>
               <ListItem avatar>
                 <Left>
                     {reviewers.profile.picture.indexOf("https")!== -1 ? (
                         <Thumbnail source={{ uri: reviewers.profile.picture }} /> ) :
                         (<Thumbnail source={userUrl} />)
                     }
                 </Left>
                 <Body>
                   <Text>{reviewers.username}</Text>
                   <Text style={{color:'blue'}} note>{reviewers.countReviews} reseñas</Text>
                 </Body>
                 <Right>
                 {this.renderButtonFollow(reviewers)}
               </Right>
               </ListItem>
             }>
           </List>
           {this.renderReloadMoreData()}
           </Content>
         </ScrollView>
       );
    } else {
        return (
          <View style={{flex: 1, justifyContent: 'center', padding: 10 }}>
            <ActivityIndicator size="large" color='#62a1f1'/>
          </View>
        );
    }
  }
}

const mapStateToProps = state => {
  return {
    rankings:state.RankingReducer
  }
}

export default connect(mapStateToProps)(RankingReviewersScreen);

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingBottom:20,
  },
  message:{
     color:'#000',
     backgroundColor: '#fff',
     fontSize:20,
     padding:25,
     margin:25
  },
})
