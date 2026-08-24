import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SquiLogo } from '../../components/common/SquiLogo';
import { profileStyles as styles } from './Profile.styles';

export const ProfileScreen: React.FC = () => {
  const [fullName, setFullName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex@squi.app');
  const [currentWeight, setCurrentWeight] = useState('68.2');
  const [targetWeight, setTargetWeight] = useState('65.0');
  const [targetSugar, setTargetSugar] = useState('25');
  const [targetSodium, setTargetSodium] = useState('2000');
  const [targetWater, setTargetWater] = useState('2500');

  const [weightReminder, setWeightReminder] = useState(true);
  const [mealReminder, setMealReminder] = useState(true);
  const [summaryReminder, setSummaryReminder] = useState(true);

  const handleSaveProfile = () => {
    Alert.alert('Profile Saved', 'Your nutrition targets and reminders have been updated! 🌿');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card Header */}
        <View style={styles.headerCard}>
          <SquiLogo size={56} variant="squircle" style={styles.avatar} />
          <View style={styles.infoWrap}>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.email}>{email}</Text>
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>Active Health Journey</Text>
            </View>
          </View>
        </View>

        {/* Daily Nutrition & Health Targets */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Health Targets</Text>

          <View style={styles.inputRow}>
            <View style={styles.inputCol}>
              <Text style={styles.label}>Current Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={currentWeight}
                onChangeText={setCurrentWeight}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputCol}>
              <Text style={styles.label}>Target Weight (kg)</Text>
              <TextInput
                style={styles.input}
                value={targetWeight}
                onChangeText={setTargetWeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputCol}>
              <Text style={styles.label}>Daily Sugar Limit (g)</Text>
              <TextInput
                style={styles.input}
                value={targetSugar}
                onChangeText={setTargetSugar}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputCol}>
              <Text style={styles.label}>Daily Sodium Limit (mg)</Text>
              <TextInput
                style={styles.input}
                value={targetSodium}
                onChangeText={setTargetSodium}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.label}>Daily Water Goal (ml)</Text>
          <TextInput
            style={styles.input}
            value={targetWater}
            onChangeText={setTargetWater}
            keyboardType="numeric"
          />
        </View>

        {/* Reminder Preferences */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Smart Reminders</Text>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchTitle}>Morning Weight Reminder</Text>
              <Text style={styles.switchSub}>07:30 AM Daily</Text>
            </View>
            <Switch
              value={weightReminder}
              onValueChange={setWeightReminder}
              trackColor={{ false: '#CBD5E1', true: '#1B432C' }}
            />
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchTitle}>Meal Logging Prompts</Text>
              <Text style={styles.switchSub}>Breakfast, Lunch & Dinner</Text>
            </View>
            <Switch
              value={mealReminder}
              onValueChange={setMealReminder}
              trackColor={{ false: '#CBD5E1', true: '#1B432C' }}
            />
          </View>

          <View style={[styles.switchRow, { borderBottomWidth: 0 }]}>
            <View>
              <Text style={styles.switchTitle}>Evening Daily Health Summary</Text>
              <Text style={styles.switchSub}>09:00 PM Scorecard</Text>
            </View>
            <Switch
              value={summaryReminder}
              onValueChange={setSummaryReminder}
              trackColor={{ false: '#CBD5E1', true: '#1B432C' }}
            />
          </View>
        </View>

        {/* SQUI Philosophy Card */}
        <View style={styles.philosophyCard}>
          <Text style={styles.philosophyTitle}>The SQUI Motto</Text>
          <Text style={styles.philosophyText}>
            "Awareness over restriction. Progress over perfection. Education over judgment."
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save Targets & Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
