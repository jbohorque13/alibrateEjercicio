  import { createMaterialTopTabNavigator, TabBarBottom, createStackNavigator } from 'react-navigation';
import RankingReviewersScreen from '../containers/RankingReviewersScreen';
import RankingReadersScreen from '../containers/RankingReadersScreen';
let RankingReviewers = createStackNavigator({ RankingReviewersScreen });
let RankingReaders = createStackNavigator({ RankingReadersScreen });
RankingReaders.navigationOptions = {
  tabBarLabel: 'Lo más leidos',
};

RankingReviewers.navigationOptions = {
  tabBarLabel: 'Lo más reseñados', 
};

export default createMaterialTopTabNavigator(
  {
    RankingReaders,
    RankingReviewers,
  },
  {
    tabBarOptions:{
      tabStyle:{
        backgroundColor:'#0d202dd4'
      }
    }
  }

);
