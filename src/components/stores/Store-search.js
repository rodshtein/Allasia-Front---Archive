import { writable } from 'svelte/store';


export const searchInProgress = writable( false );
export const searchString = writable( null );
export const prevSearchString = writable( null );
export const backPointId  = writable( null );
export const searchResult = writable( {
  success: false,
  pages: null,
  branches: null,
  count: {
    pages: null,
    branches: null
  }
});
