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
	})
