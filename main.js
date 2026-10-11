(function () {
var msg = "Olá Nexus! Gostaria de encomendar um site.";
var url = "https://wa.me/258843369443?text=" + encodeURIComponent(msg);
document.querySelectorAll(".order-link").forEach(function (a) {
a.href = url;
});
var status = document.getElementById("copyStatus");
document.getElementById("copyBtn").addEventListener("click", function () {
var num = "843369443";
var done = function () {
status.textContent = "Número copiado.";
};
var fallback = function () {
var r = document.createRange();
r.selectNodeContents(document.getElementById("phone"));
var s = window.getSelection();
s.removeAllRanges();
s.addRange(r);
status.textContent = "Número selecionado. Copie manualmente.";
};
try {
navigator.clipboard.writeText(num).then(done, fallback);
} catch (e) {
fallback();
}
});
var c = document.getElementById("net"), ctx = c.getContext("2d");
var pts = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
function size() {
W = window.innerWidth;
H = window.innerHeight;
c.width = W * dpr;
c.height = H * dpr;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
var n = Math.max(28, Math.min(80, Math.floor(W * H / 16000)));
pts = [];
for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() -.5) *.25, vy: (Math.random() -.5) *.25 });
}
function draw() {
ctx.clearRect(0, 0, W, H);
var max = 150;
for (var i = 0; i < pts.length; i++) {
var p = pts[i];
if (!reduce) {
p.x += p.vx;
p.y += p.vy;
if (p.x < 0 || p.x > W) p.vx *= -1;
if (p.y < 0 || p.y > H) p.vy *= -1;
}
for (var j = i + 1; j < pts.length; j++) {
var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
if (d < max) {
ctx.strokeStyle = "rgba(34,211,238," + (0.22 * (1 - d / max)).toFixed(3) + ")";
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(p.x, p.y);
ctx.lineTo(q.x, q.y);
ctx.stroke();
}
}
ctx.fillStyle = "rgba(34,211,238,.55)";
ctx.beginPath();
ctx.arc(p.x, p.y, 1.6, 0, 6.2832);
ctx.fill();
}
if (!reduce) requestAnimationFrame(draw);
}
size();
draw();
window.addEventListener("resize", function () {
size();
if (reduce) draw();
});
})();


