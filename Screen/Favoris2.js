import { View, Text } from "react-native";
import { useEffect, useState } from "react";

import axios from "axios";

export default function Fvaoris2() {
  const [data, setData] = useState();
  useEffect(() => {
    const fav = async () => {
      const response = await axios.get("http://localhost:4001/favoris");
      console.log(response.data);
      setData(response.data);
    };
    fav();
  }, []);
  return (
    <View>
      <Text>favoris2</Text>
      {data.map((favoris, index) => {
        console.log(favoris);
        return <Text key={index}>{favoris}</Text>;
      })}
    </View>
  );
}
