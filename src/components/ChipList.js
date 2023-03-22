import React, { useContext, useState } from 'react'
import { View, StatusBar, Text } from 'react-native';
import { Chip, Icon } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const ChipList = ({ data }) => {

    const [chipState, setChipState] = useState(
        data.map((item) => ({ id: item.id, name: item.name, selected: false, color: item.color }))
    );
    const handleChipPress = (id) => {
        setChipState((prevState) => {
            const updatedState = [...prevState];
            const chipIndex = updatedState.findIndex((chip) => chip.id === id);
            updatedState[chipIndex] = {
                ...updatedState[chipIndex],
                selected: !updatedState[chipIndex].selected,
            };
            return updatedState;
        });
    };

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {chipState.map((item) => (
                <Chip
                    key={item.id}
                    title={item.name}
                    onPress={() => handleChipPress(item.id)}
                    icon={item.icon}
                    titleStyle={item.selected ? { color: '#FFFFFF', fontSize: 12 } : { color: '#A7A7A7', fontSize: 12 }}
                    buttonStyle={{
                        backgroundColor: item.selected ? '#26A9E1' : '#ECECEC',
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: '#ECECEC',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                    }}
                    containerStyle={{ marginRight: 10, marginBottom: 10 }}
                />
            ))}
        </View>
    );
};
export default ChipList
