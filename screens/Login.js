import React from 'react';
import { View ,Text, TouchableOpacity } from 'react-native';
import { useRef } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';
import AuthButton from '../components/auth/AuthButton';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function Login({navigation}){
  const {register, handleSubmit, setValue} = useForm()
  const passwordRef = useRef();
  const onNext = (next)=>{
    next?.current?.focus(); 
  };
  const onValid = (data)=>{
    console.log(data);
  }

  useEffect(()=>{
    register("username");
    register("password");
  },[register])// runs only once, or if the 'register' changes

  return(
    <AuthLayout>
      <TextInput
        autoCapitalize={"none"}
        placeholder="아이디"
        placeholderTextColor="gray"
        returnKeyType="next"
        onSubmitEditing={()=>onNext(passwordRef)}
        onChangeText={(text)=>setValue("username",text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="비밀번호"
        placeholderTextColor="gray"
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text)=>setValue("password",text)}
      />
      <AuthButton text="Log in" disabled={false} onPress={handleSubmit(onValid)} loading={true} />
    </AuthLayout>
  )
}