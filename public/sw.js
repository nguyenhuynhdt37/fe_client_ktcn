self.addEventListener('push', function (event) {
  if (!event.data) {
    console.log('Push event has no data.');
    return;
  }

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.error('Push event data is not JSON:', event.data.text());
    data = {
      title: 'Thông báo mới',
      body: event.data.text(),
      url: '/'
    };
  }

  const title = data.title || 'Thông báo mới từ KTCN';
  const options = {
    body: data.body || '',
    icon: data.icon || '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const targetUrl = event.notification.data.url;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // Nếu đã có tab đang mở trang web, tìm và focus tab đó, đồng thời chuyển hướng URL
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          if ('navigate' in client) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }
      // Nếu chưa có tab nào mở, mở tab mới
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
