import { supabase } from './supabase';
import { getUserId } from './users';

export interface Person {
  id: string;
  user_id: string;
  name: string;
  birthday_day: number;
  birthday_month: number;
  birthday_year?: number;
  relation: string;
  color: string;
  emoji: string;
}

export async function fetchPersons(): Promise<Person[]> {
  const userId = await getUserId();
  if (!userId) return [];
  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function addPerson(p: Omit<Person, 'id' | 'user_id'>): Promise<Person> {
  const userId = await getUserId();
  if (!userId) throw new Error('Kein Nutzer');
  const { data, error } = await supabase
    .from('persons')
    .insert({ ...p, user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePerson(id: string, p: Partial<Person>): Promise<void> {
  const { error } = await supabase.from('persons').update(p).eq('id', id);
  if (error) throw error;
}

export async function deletePerson(id: string): Promise<void> {
  const { error } = await supabase.from('persons').delete().eq('id', id);
  if (error) throw error;
}
