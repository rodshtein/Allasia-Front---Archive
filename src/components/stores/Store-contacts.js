import { writable } from 'svelte/store';

export const contactsStore = writable(null);
export const showCallModal = writable(false);
export const contactsIsLoaded = writable(false);
export const contacts = writable(null);
export const mainContact = writable(false);