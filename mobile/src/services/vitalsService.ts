import {
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  increment,
  serverTimestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Firestore schema:
 *   users/{userId}/hydrationLogs/{YYYY-MM-DD} -> { date, totalMl, updatedAt }
 *   users/{userId}/weightLogs/{YYYY-MM-DD}    -> { date, weightKg, updatedAt }
 * One document per user per calendar day (user-local date), editable.
 */

export interface WeightEntry {
  date: string;
  weightKg: number;
}

/** User-local calendar date as YYYY-MM-DD (not UTC, so midnight boundaries are correct). */
export const getLocalDateKey = (d: Date = new Date()): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// ==========================================
// Daily Hydration
// ==========================================

/** Atomically adds water to today's total. */
export async function logWaterIntake(userId: string, amountMl: number): Promise<void> {
  const dateKey = getLocalDateKey();
  await setDoc(
    doc(db, 'users', userId, 'hydrationLogs', dateKey),
    { date: dateKey, totalMl: increment(amountMl), updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Realtime listener for today's hydration total (0 if nothing logged yet). */
export function subscribeToDailyHydration(
  userId: string,
  onUpdate: (totalMl: number) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  return onSnapshot(
    doc(db, 'users', userId, 'hydrationLogs', getLocalDateKey()),
    (snap) => onUpdate(snap.exists() ? (snap.data().totalMl as number) || 0 : 0),
    (err) => onError?.(err)
  );
}

// ==========================================
// Weight Trend
// ==========================================

/** One primary weight entry per day; logging again today updates it. */
export async function logWeight(userId: string, weightKg: number): Promise<void> {
  const dateKey = getLocalDateKey();
  await setDoc(
    doc(db, 'users', userId, 'weightLogs', dateKey),
    { date: dateKey, weightKg, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Realtime listener for the most recent weight entries, newest first. */
export function subscribeToWeightTrend(
  userId: string,
  onUpdate: (entries: WeightEntry[]) => void,
  days: number = 8,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(collection(db, 'users', userId, 'weightLogs'), orderBy('date', 'desc'), limit(days));
  return onSnapshot(
    q,
    (snap) =>
      onUpdate(
        snap.docs.map((d) => ({
          date: d.data().date as string,
          weightKg: d.data().weightKg as number,
        }))
      ),
    (err) => onError?.(err)
  );
}
