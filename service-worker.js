this.onpush = function(event) {
	console.log(event.data);
	// From here we can write the data to IndexedDB, send it to any open
	// windows, display a notification, etc.
}

self.addEventListener('push', function(event) {
  var promise = self.registration.showNotification('Push notification!');

  event.waitUntil(promise);
});

// // Register event listener for the 'push' event.
// self.addEventListener('push', function(event) {
//   // Keep the service worker alive until the notification is created.
//   event.waitUntil(
//     // Show a notification with title 'ServiceWorker Cookbook' and body 'Alea iacta est'.
//     self.registration.showNotification('ServiceWorker Cookbook', {
//       body: 'Alea iacta est',
//     })
//   );
// });
