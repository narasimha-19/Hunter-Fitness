import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function App() {
  const [xp, setXP] = useState(0);
  const [rank, setRank] = useState("E");

  const addPushups = async (count) => {
    const newXP = xp + count;
    setXP(newXP);
    
    // Update rank
    if (newXP >= 1000) setRank("D");
    if (newXP >= 3000) setRank("C");
    
    // Save to Firebase
    await updateDoc(doc(db, "hunters", "user1"), {
      xp: newXP,
      rank: rank
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Rank: {rank}</Text>
      <Text>XP: {xp}</Text>
      <Button 
        title="Do 10 Push-Ups (+10 XP)" 
        onPress={() => addPushups(10)} 
      />
    </View>
  );
    }
