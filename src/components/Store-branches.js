import { writable } from 'svelte/store';

export const isShowing = writable(false);
export const branchId = writable(null);