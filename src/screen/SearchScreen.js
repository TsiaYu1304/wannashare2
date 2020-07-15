import React from "react";
import {View, Text, Button} from "react-native"


const SearchScreen = ({navigation}) =>{

    return (
        <View>
            <Button
            title="back"
            onPress={() => navigation.goBack()} />
        </View>
    )
}

export default SearchScreen;