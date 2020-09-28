import { getContext, setContext, onMount } from 'svelte';
import { ApolloError } from '@apollo/client/core';
import { readable } from 'svelte/store';

var CLIENT = typeof Symbol !== "undefined" ? Symbol("client") : "@@client";


function getClient() {
	var client = getContext(CLIENT);
	if (!client) {
		throw new Error("ApolloClient has not been set yet, use setClient(new ApolloClient({ ... })) to define it");
	}
	return client;
}


function setClient(client) {
	setContext(CLIENT, client);
}


function mutation(mutation) {
	var client = getClient();
	return function (options) {
		return client.mutate({ mutation, ...options });
	};
}

function observableToReadable(observable, initialValue) {
	if (initialValue === void 0) {
		initialValue = {
			loading: true,
			data: undefined,
			error: undefined,
		}
	}
	const store = readable(initialValue, (set) => {

		var skipDuplicate = (
			initialValue === null || initialValue === void 0 ? void 0 : initialValue.data) !== undefined;
		let skipped = false;

		const subscription = observable.subscribe(
			(result) => {
				if (skipDuplicate && !skipped) {
					skipped = true;
					return;
				}

				if (result.errors) {
					const error = new ApolloError({ graphQLErrors: result.errors });
					set({ loading: false, data: undefined, error });
				} else {
					set({ loading: false, data: result.data, error: undefined });
				}
			},
			(error) => set({ loading: false, data: undefined, error })
		);

		return () => subscription.unsubscribe();
	});

	return store;
}


var extensions = [
	"fetchMore",
	"getCurrentResult",
	"getLastError",
	"getLastResult",
	"isDifferentFromLastResult",
	"refetch",
	"resetLastResults",
	"resetQueryStoreErrors",
	"result",
	"setOptions",
	"setVariables",
	"startPolling",
	"stopPolling",
	"subscribeToMore",
	"updateQuery",
];

function observableQueryToReadable(query, initialValue) {
	var store = observableToReadable(query, initialValue);

	for (const extension of extensions) {
		store[extension] = query[extension].bind(query);
	}

	return store;
}

var restoring
	= typeof WeakSet !== "undefined"
	? new WeakSet()
	: new Set();

function restore(client, query, options) {
	console.log('restore')
	restoring.add(client);
	afterHydrate( () => {
		return restoring.delete(client);
	});
	client.writeQuery({ query, ...options });
}

function afterHydrate(callback) {
	console.log('After Hydrate')
	// Attempt to wait for onMount (hydration of current component is complete),
	// but if that fails (e.g. outside of component initialization)
	// wait for next event loop for hydrate to complete
	try {
		onMount(callback);
	}
	catch (_error) {
		setTimeout(callback, 1);
	}
}

function query(client, query, options) {
	if (options === void 0) { options = {}; }
	var queryOptions = { ...options, query };

	// If client is restoring (e.g. from SSR), attempt synchronous readQuery first
	var initialValue;
	if (restoring.has(client)) {
		try {
			// undefined = skip initial value (not in cache)
			initialValue = client.readQuery(queryOptions) || undefined;
		}
		catch (err) {
			// Ignore preload errors
		}
	}
	var observable = client.watchQuery(queryOptions);
	var store = observableQueryToReadable(observable, initialValue);
	return store;
}

function subscribe(query, options) {
	if (options === void 0) { options = {}; }
	var client = getClient();
	var observable = client.subscribe({ query, ...options })
	return observableToReadable(observable);
}

export { getClient, mutation, query, restore, setClient, subscribe };