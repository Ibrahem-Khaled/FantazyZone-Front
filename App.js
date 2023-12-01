import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './screens/Start';
import Taps from './screens/Taps';
import { StatusBar } from 'expo-status-bar';
import News from './screens/News/News';
import Newscontent from './screens/News/Newscontent';
import ComplaintsSuggests from './screens/TapScreens/ComplaintsSuggests';
import Livescore from './screens/TapScreens/Livescore';
import { Auth, AuthProvider } from './screens/AuthContext/Auth';
import { useContext } from 'react';
import Createnews from './screens/News/Createnews';
import Create from './screens/Leagus/Create';
import Index from './screens/Leagus/Index';
import TeamsLeague from './screens/Leagus/Teamsleague';
import CreateTeams from './screens/Leagus/CreateTeams';
import GetuserForteam from './screens/Team/GetuserForteam';
import SetuserLeague from './screens/Leagus/SetuserLeague';
import Match from './screens/TeamsMatches/Index';
import { useFonts } from 'expo-font';
import ShowLeague from './screens/Leagus/editLeague/Show';
import EditLeague from './screens/Leagus/editLeague/EditLeague';
import ShowTeam from './screens/Team/Edit/ShowTeam';
import SetUserTeamLeader from './screens/Leagus/SetuserTeamleader';

const Stack = createNativeStackNavigator();

function Route() {
  const { userinfo } = useContext(Auth)

  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
        {!userinfo.fn_id ?
          <Stack.Screen name="start" component={Start} />
          :
          <>
            <Stack.Screen name="taps" component={Taps} />
            <Stack.Screen name="news" component={News} />
            <Stack.Screen name="newscontent" component={Newscontent} />
            <Stack.Screen name="createnews" component={Createnews} />
            <Stack.Screen name="complaintsSuggests" component={ComplaintsSuggests} />
            <Stack.Screen name="livescore" component={Livescore} />
            <Stack.Screen name="League" component={Index} />
            <Stack.Screen name="createLeague" component={Create} />
            <Stack.Screen name="leagueTeam" component={TeamsLeague} />
            <Stack.Screen name="createTeam" component={CreateTeams} />
            <Stack.Screen name="getUserforTeam" component={GetuserForteam} />
            <Stack.Screen name="setUserLeague" component={SetuserLeague} />
            <Stack.Screen name="match" component={Match} />
            <Stack.Screen name="showLeague" component={ShowLeague} />
            <Stack.Screen name="editLeague" component={EditLeague} />
            <Stack.Screen name="showTeam" component={ShowTeam} />
            <Stack.Screen name="setUserTeamLeader" component={SetUserTeamLeader} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default function App() {

  const [fontsLoaded] = useFonts({
    'Reem': require('./assets/fonts/Al-Hadith2-Regular/Al-Hadith2-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  )
}
