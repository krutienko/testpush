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

self.addEventListener("install", function(t) {
	var n = o()(f),
		e = caches.open(g).then(function(t) {
			return t.addAll(n)
		}).catch(function(t) {
			return u.a.error(t)
		});
	t.waitUntil(e)
}), self.addEventListener("activate", function(t) {
	t.waitUntil(caches.keys().then(function(t) {
		var n = t.filter(function(t) {
			return t.startsWith("dom-") && !(-1 !== j.indexOf(t))
		}).map(function(t) {
			return caches.delete(t)
		});
		return Promise.all(n)
	}))
});
var N = RegExp("".concat(encodeURI("Новостройк"), "|").concat(encodeURI("Новобуд"), "|").concat(encodeURI("Застройщик"), "|").concat(encodeURI("Забудовник"), "|panorama")),
	P = RegExp("".concat(x, "|//cdn.riastatic.com|//aframe.io"));
self.addEventListener("fetch", function(t) {
	var n = t.request;
	if ("GET" === n.method) {
		var e = new URL(n.url),
			r = e.pathname,
			o = -1 !== r.search("noRender");
		P.test(e.href) ? t.respondWith(function(t) {
			return caches.open(g).then(function(n) {
				var e = t.url;
				return n.match(e).then(function(r) {
					var o = fetch(new Request(e, {
						mode: "cors"
					})).then(function(e) {
						return -1 !== _.indexOf(+e.status) && n.put(t.url, e.clone()), e
					});
					return r || o
				})
			}).catch(function(t) {
				return u.a.error(t)
			})
		}(n)) : -1 !== w.indexOf(r) || o ? t.respondWith(function(t) {
			var n = t.url;
			return A(n, T).then(function(e) {
				return R(t, 3e3, e, T).catch(function(t) {
					return u.a.error(t), u.a.error(n), e
				})
			})
		}(n)) : -1 !== S.indexOf(r) || o ? t.respondWith(function(t) {
			return caches.open(T).then(function(n) {
				var e = t.url;
				return n.match(e).then(function(r) {
					var o = fetch(t).then(function(t) {
						return -1 !== _.indexOf(+t.status) && n.put(e, t.clone()), t
					});
					return r || o
				})
			}).catch(function(t) {
				return u.a.error(t)
			})
		}(n)) : N.test(r) && t.respondWith(function(t) {
			return A(t.url, E).then(function(n) {
				return R(t, 3e3, n, E).catch(function(e) {
					return u.a.error(e), u.a.error(t.url), n
				})
			})
		}(n))
	}
});
