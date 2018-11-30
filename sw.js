self.addEventListener("push", function(i) {
	var t = i.data.json(),
		n = t.title ? t.title : "Уведомление!",
		o = "Спасибо за подписку";
	t.body ? o = t.body : t.alert && (o = t.alert);
	var a = {
		body: o,
		icon: t.icon ? t.icon : "https://aspo.biz/i/aspo_logo_circle_525.png",
		image: t.image ? t.image : "",
		tag: "push",
		requireInteraction: !0
	};
	a.data = {
		id: t.id
	}, t.url && (a.data.url = t.url), t.custom && t.custom.u && (a.data.url = t.custom.u), i.waitUntil(self.registration.showNotification(n, a))
}), self.addEventListener("notificationclick", function(i) {
	i.notification.close(), i.notification.data && i.notification.data.url && clients.openWindow(i.notification.data.url)
}), self.addEventListener("notificationclose", function(i) {
	if (i.notification.data && i.notification.data.id) {
		var t = new Headers;
		t.append("Content-Type", "application/json");
		var n = {
				notification_id: i.notification.data.id,
				chanel_id: 2,
				user_event: 2
			},
			o = {
				method: "POST",
				body: JSON.stringify(n),
				mode: "no-cors",
				headers: t
			},
			a = new Request("https://aspo.biz/test/push", o);
		fetch(a).then(function(i) {}).catch(function(i) {
			console.error(i)
		})
	}
});