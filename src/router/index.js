import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Splash, GetStarted, Quiz, NewProgress, AddCustomQuiz, CustomQuiz, CreateFlashcard, QuizCollection, TopicProgress, Register, UpdateProfile, SubjectTaken, MentorProfile, UserProfile, Login, UploadPhoto, Chatting, Mentors, ChooseMentor, Messages, Review, Progress} from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Mentors" component={Mentors}/>
      <Tab.Screen name="Messages"  component={Messages}/>
      <Tab.Screen name="Progress"  component={Progress}/>
      <Tab.Screen name="Review" component={Review} />
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseMentor"
        component={ChooseMentor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MentorProfile"
        component={MentorProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubjectTaken"
        component={SubjectTaken}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TopicProgress"
        component={TopicProgress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="QuizCollection"
        component={QuizCollection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewProgress"
        component={NewProgress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateFlashcard"
        component={CreateFlashcard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomQuiz"
        component={CustomQuiz}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCustomQuiz"
        component={AddCustomQuiz}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
