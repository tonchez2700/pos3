import { StyleSheet } from 'react-native';



export const general = StyleSheet.create({
    inputCount: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center'
    },
})


export const ItemListSytle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
        borderColor: '#C4C4C4'
    },
    itemText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18,
        paddingVertical: 5
    },
    itemProduct: {
        width: '20%',
        borderRadius: 5,
        padding: 1,
        backgroundColor: '#26A9E1',
        marginVertical: 10,
        marginRight: 10
    },
    tinyLogo: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 5,
        height: undefined,
        aspectRatio: 1,
    },
})


export const ShopListSytle = StyleSheet.create({

    itemText: {
        borderBottomWidth: 1,
        fontSize: 26,
        width: '100%',
        padding: 5
    },
    itemTextTittle: {
        width: '20%',
        textAlign: 'center',
        fontSize: 25,
        color: 'white'
    },
    tinyLogo: {
        width: '60%',
        alignSelf: 'center',
        marginTop: 5,
        height: undefined,
        aspectRatio: 1,
        backgroundColor: 'red'
    },
    inputCount: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'center'
    },
    ButtonBottom: {
        backgroundColor: '#C42228',
        borderRadius: 4,
        paddingHorizontal: '10%'
    },
})
export const ModalIngredientsSytle = StyleSheet.create({

    header: {
        backgroundColor: '#26A9E1',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    ButtonDirection: {
        backgroundColor: '#ECECEC',
        borderRadius: 4,
        padding: 5,
    },
    ButtonBottom: {
        backgroundColor: '#C42228',
        borderRadius: 4,
        paddingHorizontal: '5%'
    },
    itemProduct: {
        width: '20%',
        borderRadius: 5,
        backgroundColor: '#26A9E1',
        marginVertical: 10,
        marginRight: 10
    },
    tinyLogo: {
        width: '10%',
        alignContent: 'center',
        borderRadius: 10,
        height: undefined,
        aspectRatio: 1,
    },
    itemSelectIng: {
        backgroundColor: '#ECECEC',
        flexDirection: 'row',
        padding: 5,
        marginVertical: 2,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#26A9E1'
    },
    itemSelectContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 5

    },
})

export const ItemListAuxSytle = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        backgroundColor: '#F2F2F2',
        borderColor: '#C4C4C4'
    },
    itemText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18,
        paddingVertical: 5
    },
    itemProduct: {
        width: '20%',
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#26A9E1',
        marginVertical: 10,
        marginRight: 10
    },
    tinyLogo: {
        width: '60%',
        alignSelf: 'center',
        marginTop: 5,
        height: undefined,
        aspectRatio: 1,
    },
})