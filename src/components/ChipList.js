import React, { useContext, useState } from 'react'
import { View, StatusBar, Text } from 'react-native';
import { Chip, Icon } from 'react-native-elements';
import { Context as ProductsContext } from '../context/ProductsContext';
import { log } from 'react-native-reanimated';

const ChipList = ({ data }) => {

    const {
        state,
        handleChipPress
    } = useContext(ProductsContext);
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.map((item) => (
                <Chip
                    key={item.id}
                    title={item.name}
                    onPress={() => handleChipPress(item.id, state.tagsProducts)}
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
