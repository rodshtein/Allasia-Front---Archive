import { writable } from 'svelte/store';

export const showMenu = writable(false);
export const branchId = writable(null);