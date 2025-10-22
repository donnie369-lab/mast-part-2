import React, { useState } from "react";
import{
  View,
  Button,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native"
import{NavigationContainer} from "@react-navigation/native";
import{createNativeStackNavigator} from "@react-navigation/native-stack";



//npm install npm install @react-navigation/native-stack @react-navigation/native-stack
//npx expo install react-native-screens react-native-safe-area-context

interface MealItem{
  id: number;
  name: string;
  description: string;
  category: string;
  calories: string;
}

const Stack = createNativeStackNavigator();
 
function HomeScreen({ navigation, route }: any) {
  const[fadeAnim] = useState(new Animated.Value(0));
  const [meals, setMeals] = useState<MealItem[]>([]);


  React.useEffect(() => {
    if(route.params?.newMeal) {
      setMeals((prev) => [...prev, route.params.newMeal]);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
    }).start();
  }
}, [route.params?.newMeal]);

return(
  <View style={styles.container}>
  <Text style={styles.header}>CHEF QUICK ORDER</Text>
<Text style={styles.header2}>Menu Prepared by CHEF:</Text>
<Text style={styles.label2}>Starters:</Text>
<Text style={styles.subHeader2}>Spring Rolls</Text>
<Text style={styles.subHeader2}>Crispy and delicious spring rolls with dipping sauce.</Text>
<Text style={styles.subHeader2}>R125.99</Text>
<Text style={styles.subHeader2}>Caeser Salad</Text>
<Text style={styles.subHeader2}>Fresh romaine lettuce with Caesar dressing and croutons.</Text>
<Text style={styles.subHeader2}>R137.99</Text>

<Text style={styles.label2}>Mains:</Text>
<Text style={styles.subHeader2}>Grilled Chicken</Text>
<Text style={styles.subHeader2}>Tender grilled chicken served with mashed potatoes</Text>
<Text style={styles.subHeader2}>R230.99</Text>
<Text style={styles.subHeader2}>Steak Frites</Text>
<Text style={styles.subHeader2}>Juicy steak with crisp fries.</Text>
<Text style={styles.subHeader2}>R345.99</Text>

<Text style={styles.label2}>Dessert:</Text>
<Text style={styles.subHeader2}>Chocolate Cake</Text>
<Text style={styles.subHeader2}>Rich and moist chocolate and vanilla ice cream.</Text>
<Text style={styles.subHeader2}>R78.99</Text>
<Text style={styles.subHeader2}>Lemon Tart</Text>
<Text style={styles.subHeader2}>Tangy lemon tart with a buttery crust</Text>
<Text style={styles.subHeader2}>R59.99</Text>

<Button
title="Add New Meal"
onPress={() => navigation.navigate("AddMeal")}
color="#4c00b0"
>
</Button>

<Text style={styles.subHeader}>
  Total Orders for the Chef:{meals.length}
</Text>
 
  <Animated.View style ={{ opacity: fadeAnim, flex:1}}>
    <FlatList
    data={meals}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({item}) => (
      <View style={styles.card}>
        <Text>{item.description}</Text>
        <Text style={styles.categoryTag}>{item.category}</Text>
        <Text style={styles.calories}>R{item.calories}.00</Text>
      </View>
    )}
    />
  </Animated.View>
  </View>
);
}

function AddMealScreen({navigation}: any){
  const [mealName, setMealName] = useState ("");
   const [mealName2, setMealName2] = useState ("");
   const [description, setDescription] = useState ("");
    const [category, setCategory] = useState ("");
     const [calories, setCalories] = useState ("");
      const categoryOptions =  [
        "Starters", 
        "Mains" , 
        "Dessert"
      ];

      const handleAdd = () => {
        if (!mealName || !description || !calories){
          alert("Please fill in all fields");
          return;
        }

        const newMeal: MealItem = {
          id: Date.now(),
          name: mealName,
          description,
          category,
          calories,
        };

        navigation.navigate("Home", { newMeal});
      };

      return(
        <View style={styles.container}>
          <Text style={styles.header}>New / Chef-Prepared</Text>

          <TextInput
          style={styles.input}
          placeholder="New Meal"
          value={mealName}
          onChangeText={setMealName}
          />

          <TextInput
          style={styles.input}
          placeholder="Chef-Prepared Meal"
          value={mealName2}
          onChangeText={setMealName2}
          />

          <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          />
          <Text style={styles.label}> Select Course:</Text>
          <View style={styles.categoryContainer}>
            {categoryOptions.map((option) => (
              <TouchableOpacity
              key={option}
              style={[
                styles.categoryButton,
                category === option && styles.selectedCategory,
              ]}
              onPress={() => setCategory(option)}
              >
                <Text
                style={[
                  styles.categoryText,
                  category === option && styles.selectedText
                ]}
                >
                   {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

         <TextInput
          style={styles.input}
          placeholder="Price (e.g. R450)"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
          />
          <Button title="Save Meal" onPress={handleAdd} color="#2e7d32"/>

          <Button
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
          color="#ff0000"
          
          />
        </View>
      );
}

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false}}
        />
        <Stack.Screen
        name="AddMeal"
        component={AddMealScreen}
        options={{ headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create ({
  Button: {
    backgroundColor: "#4CAF50", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  container:{
     flex: 1,
    padding: 20,
    backgroundColor: "#b19cd8",
  },

  header: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#fe019a",
    marginBottom: 0,
    textAlign: "center",
  },
  header2: {
    fontSize: 20,
    fontWeight: "condensed",
    color: "#ffff00",
    textAlign: "left",
  },

  subHeader: {
    fontSize: 16,
    marginVertical: 10,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  subHeader2: {
    fontSize: 12,


  },

  input: {
    borderWidth: 1,
    borderColor:"#FFF",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },

  label: {
    fontWeight: "600",
    color: "#fff"
    
  },

  label2:{
    fontWeight: "bold"

  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },

  categoryButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFF"
  },

  selectedCategory: {
    backgroundColor: "#fe019a"
  },

  categoryText:{
    color: "#fff"
  },

  selectedText: {
    color:"#FFF",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  categoryTag: {
    marginTop: 5,
    fontStyle: "italic",
   color: "#000",
  },

  calories: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#fe019a",
  },
});

