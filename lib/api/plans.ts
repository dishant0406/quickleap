import { env } from '@/lib/env';
import type { Plan } from '@/lib/zustand/plans';

interface PlansResponse {
  plans: Plan[];
  message: string;
}

export async function fetchPlans(): Promise<Plan[]> {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_LAZYWEB_BACKEND_URL}/user/plans`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error fetching plans:', response.statusText);
      return [];
    }

    const data: PlansResponse = await response.json();
    return data.plans || [];
  } catch (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
}
