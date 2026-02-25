
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dqqxhdsfkmradvvjxqam.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'ssb_publishable_m3sPQJeahzGLRxuglsg79A_HszHCQOJ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Order {
  id?: string;
  created_at?: string;
  room_id: string;
  room_title: string;
  student_id: string;
  student_name: string;
  student_email: string;
  rent: number;
  deposit: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  move_in_date: string;
  message?: string;
}

export const submitOrder = async (order: Order) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select();

  if (error) throw error;
  return data;
};

export const submitListing = async (listing: any) => {
  const { data, error } = await supabase
    .from('listings')
    .insert([listing])
    .select();

  if (error) throw error;
  return data;
};

export const fetchListings = async () => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};
