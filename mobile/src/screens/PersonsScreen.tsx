import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, Modal, TextInput, ScrollView,
  Alert, ActivityIndicator
} from 'react-native';
import { fetchPersons, addPerson, deletePerson, Person } from '../lib/persons';
import { scheduleBirthdayReminder } from '../lib/notifications';

const MONTHS = ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'];
const RELATIONS = ['Ich','Partner/in','Kind','Mutter','Vater','Geschwister','Freund/in','Kollege/in','Sonstige'];
const COLORS = ['#6C63FF','#E74C3C','#2ECC71','#F39C12','#3498DB','#9B59B6','#1ABC9C','#E91E63'];
const EMOJIS = ['🎂','❤️','⭐','🌟','🎉','🎈','🌸','🦁','🐼','🦊'];

export default function PersonsScreen() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Formular-State
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState(1);
  const [relation, setRelation] = useState('Freund/in');
  const [color, setColor] = useState('#6C63FF');
  const [emoji, setEmoji] = useState('🎂');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await fetchPersons();
      setPersons(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setName(''); setDay(''); setMonth(1);
    setRelation('Freund/in'); setColor('#6C63FF'); setEmoji('🎂');
  }

  async function handleSave() {
    if (!name.trim() || !day) {
      Alert.alert('Pflichtfelder', 'Bitte Name und Geburtstag eingeben.');
      return;
    }
    const d = parseInt(day);
    if (d < 1 || d > 31) { Alert.alert('Fehler', 'Ungültiger Tag.'); return; }

    setSaving(true);
    try {
      const p = await addPerson({
        name: name.trim(), birthday_day: d, birthday_month: month,
        relation, color, emoji,
      });
      await scheduleBirthdayReminder(p.name, p.birthday_day, p.birthday_month);
      setPersons(prev => [...prev, p]);
      setModalVisible(false);
      resetForm();
    } catch (e) {
      Alert.alert('Fehler', 'Person konnte nicht gespeichert werden.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, personName: string) {
    Alert.alert(
      `${personName} löschen?`,
      'Die Person wird aus deiner Liste entfernt.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Löschen', style: 'destructive', onPress: async () => {
          await deletePerson(id);
          setPersons(prev => prev.filter(p => p.id !== id));
        }},
      ]
    );
  }

  const daysInMonth = new Date(2024, month, 0).getDate();

  if (loading) return <View style={styles.center}><ActivityIndicator color="#6C63FF" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Personen 🎂</Text>
          <Text style={styles.headerSub}>{persons.length} Person{persons.length !== 1 ? 'en' : ''} gespeichert</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addBtnText}>+ Hinzufügen</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={persons}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <PersonCard person={item} onDelete={handleDelete} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>👨‍👩‍👧‍👦</Text>
            <Text style={styles.emptyTitle}>Noch keine Personen</Text>
            <Text style={styles.emptySub}>Füge Freunde und Familie hinzu, um an ihre Geburtstage erinnert zu werden.</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => setModalVisible(true)}>
              <Text style={styles.emptyBtnText}>Erste Person hinzufügen</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Modal: Person hinzufügen */}
      <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => { setModalVisible(false); resetForm(); }}>
              <Text style={styles.modalCancel}>Abbrechen</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Person hinzufügen</Text>
            <TouchableOpacity onPress={handleSave} disabled={saving}>
              <Text style={[styles.modalSave, saving && { opacity: 0.4 }]}>
                {saving ? '...' : 'Speichern'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Emoji + Farbe */}
            <Text style={styles.label}>Emoji</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiRow}>
              {EMOJIS.map(e => (
                <TouchableOpacity
                  key={e}
                  style={[styles.emojiChip, emoji === e && styles.emojiChipSelected]}
                  onPress={() => setEmoji(e)}
                >
                  <Text style={styles.emojiText}>{e}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Farbe</Text>
            <View style={styles.colorRow}>
              {COLORS.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.colorDot, { backgroundColor: c }, color === c && styles.colorDotSelected]}
                  onPress={() => setColor(c)}
                />
              ))}
            </View>

            {/* Name */}
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="z.B. Anna Müller"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#aaa"
            />

            {/* Beziehung */}
            <Text style={styles.label}>Beziehung</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
              {RELATIONS.map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.chip, relation === r && styles.chipSelected]}
                  onPress={() => setRelation(r)}
                >
                  <Text style={[styles.chipText, relation === r && styles.chipTextSelected]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Geburtstag */}
            <Text style={styles.label}>Monat *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
              {MONTHS.map((m, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.chip, month === i + 1 && styles.chipSelected]}
                  onPress={() => setMonth(i + 1)}
                >
                  <Text style={[styles.chipText, month === i + 1 && styles.chipTextSelected]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Tag *</Text>
            <View style={styles.dayGrid}>
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
                <TouchableOpacity
                  key={d}
                  style={[styles.dayChip, day === String(d) && styles.chipSelected]}
                  onPress={() => setDay(String(d))}
                >
                  <Text style={[styles.chipText, day === String(d) && styles.chipTextSelected]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function PersonCard({ person, onDelete }: { person: Person; onDelete: (id: string, name: string) => void }) {
  const today = new Date();
  const birthday = new Date(today.getFullYear(), person.birthday_month - 1, person.birthday_day);
  if (birthday < today) birthday.setFullYear(today.getFullYear() + 1);
  const daysLeft = Math.round((birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isToday = daysLeft === 0;
  const isSoon = daysLeft <= 7;

  return (
    <View style={[styles.card, { borderLeftColor: person.color }]}>
      <View style={[styles.cardAvatar, { backgroundColor: person.color + '20' }]}>
        <Text style={styles.cardEmoji}>{person.emoji}</Text>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{person.name}</Text>
        <Text style={styles.cardRelation}>{person.relation}</Text>
        <Text style={styles.cardBirthday}>
          🎂 {person.birthday_day}. {['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][person.birthday_month - 1]}
        </Text>
      </View>
      <View style={styles.cardRight}>
        {isToday ? (
          <View style={[styles.daysChip, { backgroundColor: '#2ECC71' }]}>
            <Text style={styles.daysText}>Heute! 🎉</Text>
          </View>
        ) : isSoon ? (
          <View style={[styles.daysChip, { backgroundColor: '#F39C12' }]}>
            <Text style={styles.daysText}>in {daysLeft}d</Text>
          </View>
        ) : (
          <View style={styles.daysChip}>
            <Text style={[styles.daysText, { color: '#888' }]}>in {daysLeft}d</Text>
          </View>
        )}
        <TouchableOpacity onPress={() => onDelete(person.id, person.name)} style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1A1A2E' },
  headerSub: { fontSize: 13, color: '#888', marginTop: 2 },
  addBtn: { backgroundColor: '#6C63FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  list: { paddingBottom: 40 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10,
    borderRadius: 16, padding: 14, borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  cardAvatar: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  cardEmoji: { fontSize: 24 },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  cardRelation: { fontSize: 12, color: '#888', marginTop: 1 },
  cardBirthday: { fontSize: 13, color: '#555', marginTop: 4 },
  cardRight: { alignItems: 'flex-end', gap: 8 },
  daysChip: {
    backgroundColor: '#F0F0F0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10,
  },
  daysText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  deleteBtn: { padding: 4 },
  deleteBtnText: { fontSize: 18 },
  empty: { alignItems: 'center', padding: 48 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A2E', marginBottom: 8 },
  emptySub: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 21, marginBottom: 24 },
  emptyBtn: { backgroundColor: '#6C63FF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 },
  emptyBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  modal: { flex: 1, backgroundColor: '#F8F9FA' },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderColor: '#F0F0F0',
    backgroundColor: '#fff',
  },
  modalCancel: { fontSize: 15, color: '#888' },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A2E' },
  modalSave: { fontSize: 15, color: '#6C63FF', fontWeight: '700' },
  modalContent: { flex: 1, padding: 20 },
  label: { fontSize: 13, fontWeight: '700', color: '#888', marginBottom: 8, marginTop: 16, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 16, color: '#1A1A2E', borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  emojiRow: { maxHeight: 52 },
  emojiChip: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
    borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  emojiChipSelected: { borderColor: '#6C63FF', backgroundColor: '#F0EEFF' },
  emojiText: { fontSize: 22 },
  colorRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  colorDot: { width: 36, height: 36, borderRadius: 18 },
  colorDotSelected: { borderWidth: 3, borderColor: '#1A1A2E' },
  chipRow: { maxHeight: 44 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, marginRight: 8,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#E0E0E0',
  },
  chipSelected: { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#444' },
  chipTextSelected: { color: '#fff' },
  dayGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 40 },
  dayChip: {
    width: 44, height: 44, borderRadius: 10, backgroundColor: '#fff',
    borderWidth: 1.5, borderColor: '#E0E0E0',
    alignItems: 'center', justifyContent: 'center',
  },
});
