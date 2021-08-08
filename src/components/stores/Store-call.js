import { writable } from 'svelte/store';

export const showCallModal = writable(false);
export const contactsIsLoaded = writable(false);
export const contacts = writable(null);