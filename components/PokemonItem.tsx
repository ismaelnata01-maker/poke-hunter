import { Image } from "expo-image"
import { StyleSheet, Text, View } from "react-native"

interface Props{
    id: number,
    name: string,
    image: string,
    captured?: boolean,
}

export default function PokemonItem({
    id,
    name,
    image,
    captured = false,
}: Props){
    return(
        <View style={styles.container}>
            <Text style={styles.number}>#{String(id).padStart(4, "0")}</Text>

            <View style={styles.imageContainer}>
                <Image
                    source={ {uri: image} }
                    contentFit="contain"
                    transition={200}
                    style={[styles.image, !captured && styles.hiddenImage]}
                />

                {!captured &&(
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>?</Text>
                    </View>
                )}
            </View>

            <Text>{captured ? name : "???"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 12,
        borderRadius: 16,
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#303030",
        elevation: 3,
        shadowColor: "black",
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    number:{
        color: "#888888",
        fontSize: 12,
        fontWeight: "semibold",
    },
    imageContainer:{
        height: 130,
        alignItems: "center",
        justifyContent: "center",
    },
    image:{ 
        width: "100%",
        height: "100%",
    },
    hiddenImage:{
        tintColor: "black",
    },
    questionContainer:{
        position: "absolute",
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    question:{
        color: "white",
        fontSize: 38,
        fontWeight: "bold",
    },
    name:{
        marginTop: 6,
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "capitalize",
    },
})