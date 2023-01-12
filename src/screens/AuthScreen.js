import React, { useContext } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { AuthSchema } from './../config/schemas';
import useHandleOnChangeTextInput from './../hooks/useHandleOnChangeTextInput';
import tw from 'tailwind-react-native-classnames';
import SimpleNavBar from '../components/SimpleNavBar'
import InputForm from '../components/Forms/InputForm';
import ButtonFrom from '../components/Forms/ButtonFrom';
import ModalRecovery from '../components/Modal/ModalRecovery';

const AuthScreen = () => {
    const navigation = useNavigation();
    const { state, signin, clearState, isVisibleModal } = useContext(AuthContext);
    const [inputState, handleInputChange] = useHandleOnChangeTextInput(AuthSchema);

    return (

        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={[tw`items-center flex-1`]}>
                <SimpleNavBar />
                <View style={tw`w-4/5 mt-10`}>
                    <InputForm
                        maxLength={50}
                        name='username'
                        placeholder='USUARIO'
                        leftIcon={<Icon type='Ionicons' name='person-outline' size={25} color='#D9D9D9' style={{ marginRight: 15 }} />}
                        inputContainerStyle={styles.input} keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(value) => handleInputChange(value, 'email')} />
                    <InputForm
                        maxLength={15}
                        name='password'
                        leftIcon={<Icon type='SimpleLineIcons' name='lock' size={25} color='#D9D9D9' style={{ marginRight: 15 }} />}
                        inputContainerStyle={styles.input}
                        placeholder='CONTRASEÑA'
                        secureTextEntry={true}
                        onChangeText={(value) => handleInputChange(value, 'password')} />
                    <Text style={[tw`mb-10 font-bold `, { fontSize: 12, color: '#707070', textAlign: 'center' }]}>¿Olvidaste tu contraseña? Da click
                        <Text onPress={() => isVisibleModal()} style={{ color: '#004480' }}> aquí.</Text></Text>
                    <ButtonFrom
                        handleSubmit={() => {
                            signin(inputState);
                        }}
                        loading={state.fetchingData ? true : false}
                    />

                </View>
                <ModalRecovery />
                {
                    state.error === true
                        ?
                        Alert.alert(
                            "Error de Autentificacion",
                            state.message,
                            [{
                                text: "OK",
                                onPress: clearState
                            }]
                        )
                        :
                        null
                }

            </ScrollView>
            <View style={{ paddingHorizontal: 70 }}>
                <Text style={[tw`mb-10 font-bold `, { fontSize: 12, color: '#707070', textAlign: 'center' }]}>Al crear tu cuenta estas aceptando nuestros
                    <Text style={{ color: '#004480', textAlign: 'center' }}> Términos de uso y Política de privacidad.</Text> </Text>
            </View>
        </View >

    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
    },
    input: {
        backgroundColor: 'white',
        padding: 9,
        borderBottomColor: 'gray',
        paddingLeft: 20,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: 'white',
        borderBottomColor: 'white'
    }

})
