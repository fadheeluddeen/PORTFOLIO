import { useEffect, useRef } from "react";

interface Fish {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    size: number;
    color: string;
    isBig: boolean;
    isShark?: boolean;
}

interface Bubble {
    x: number;
    y: number;
    size: number;
    speed: number;
    wobble: number;
    wobbleSpeed: number;
}

interface InkCloud {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    vx: number;
    vy: number;
}

interface Octopus {
    x: number;
    y: number;
    vx: number;
    vy: number;
    targetX: number;
    targetY: number;
    hue: number;          // current color hue
    baseHue: number;      // resting color hue (purple ~270)
    scared: boolean;
    scaredTimer: number;
    idleTimer: number;    // time until picking a new wander target
    sitting: boolean;     // is it sitting still on content
}

export function FishBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let fishes: Fish[] = [];
        let bubbles: Bubble[] = [];
        let inkClouds: InkCloud[] = [];
        let time = 0;

        let pointer = { x: -1000, y: -1000, clicked: false };
        const handleMouseMove = (e: MouseEvent) => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
        };
        const handleClick = () => { pointer.clicked = true; };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        // ── Octopus state ──
        const octo: Octopus = {
            x: canvas.width * 0.5,
            y: canvas.height * 0.4,
            vx: 0,
            vy: 0,
            targetX: canvas.width * 0.5,
            targetY: canvas.height * 0.4,
            hue: 270,
            baseHue: 270,
            scared: false,
            scaredTimer: 0,
            idleTimer: 200,
            sitting: true,
        };

        // ── Fish spawning ──
        const spawnSmallFish = (count: number) => {
            for (let i = 0; i < count; i++) {
                fishes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * (canvas.height - 150),
                    z: 0, vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5, vz: 0,
                    size: Math.random() * 5 + 6,
                    color: `hsl(${Math.random() * 40 + 190}, 100%, 65%)`,
                    isBig: false,
                });
            }
        };
        const spawnBigFish = () => {
            for (let i = 0; i < 3; i++) {
                fishes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * (canvas.height - 150),
                    z: 0, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, vz: 0,
                    size: Math.random() * 5 + 16,
                    color: `hsl(${Math.random() * 30 + 10}, 100%, 60%)`,
                    isBig: true,
                });
            }
        };
        const spawnShark = () => {
            fishes.push({
                x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                z: 0, vx: 3, vy: 0.5, vz: 0,
                size: 45, color: "#6b7280", isBig: true, isShark: true,
            });
        };
        const spawnBubble = () => {
            bubbles.push({
                x: Math.random() * canvas.width, y: canvas.height + 20,
                size: Math.random() * 4 + 2, speed: Math.random() * 2 + 1,
                wobble: Math.random() * Math.PI * 2, wobbleSpeed: Math.random() * 0.1 + 0.05,
            });
        };

        spawnSmallFish(20);
        spawnBigFish();
        spawnShark();
        for (let i = 0; i < 30; i++) { spawnBubble(); bubbles[i].y = Math.random() * canvas.height; }

        // ── Seaweed drawing ──
        const drawSeaweedBlade = (baseX: number, baseY: number, bladeHeight: number, baseWidth: number, seed: number) => {
            ctx.save();
            const sway1 = Math.sin(time * 0.015 + seed) * 18;
            const sway2 = Math.sin(time * 0.012 + seed * 1.7) * 25;
            const sway3 = Math.sin(time * 0.018 + seed * 2.3) * 15;
            const midY1 = baseY - bladeHeight * 0.33;
            const midY2 = baseY - bladeHeight * 0.66;
            const tipY = baseY - bladeHeight;
            const midX1 = baseX + sway1;
            const midX2 = baseX + sway1 + sway2;
            const tipX = baseX + sway1 + sway2 + sway3;
            const w0 = baseWidth, w1 = baseWidth * 0.75, w2 = baseWidth * 0.4;

            ctx.beginPath();
            ctx.moveTo(baseX - w0 / 2, baseY);
            ctx.quadraticCurveTo(midX1 - w1 / 2, midY1, midX2 - w2 / 2, midY2);
            ctx.quadraticCurveTo(tipX - 1, tipY + 5, tipX, tipY);
            ctx.quadraticCurveTo(tipX + 1, tipY + 5, midX2 + w2 / 2, midY2);
            ctx.quadraticCurveTo(midX1 + w1 / 2, midY1, baseX + w0 / 2, baseY);
            ctx.closePath();

            const grad = ctx.createLinearGradient(baseX, baseY, tipX, tipY);
            const variants = [
                ["rgba(22,101,52,0.45)", "rgba(34,139,34,0.35)", "rgba(74,222,128,0.2)"],
                ["rgba(21,94,64,0.4)", "rgba(46,139,87,0.3)", "rgba(52,211,153,0.15)"],
                ["rgba(20,83,45,0.5)", "rgba(22,163,74,0.3)", "rgba(134,239,172,0.15)"],
            ];
            const v = variants[seed % 3];
            grad.addColorStop(0, v[0]); grad.addColorStop(0.5, v[1]); grad.addColorStop(1, v[2]);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(baseX, baseY);
            ctx.quadraticCurveTo(midX1, midY1, midX2, midY2);
            ctx.quadraticCurveTo(tipX, tipY + 3, tipX, tipY);
            ctx.strokeStyle = "rgba(16,70,35,0.15)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        };

        // ── Octopus drawing (receives h,s,l components) ──
        const drawOctopusBody = (ox: number, oy: number, hue: number, scared: boolean) => {
            ctx.save();
            ctx.translate(ox, oy);

            const bob = scared ? Math.sin(time * 0.15) * 3 : Math.sin(time * 0.025) * 4;
            ctx.translate(0, bob);

            const sat = scared ? "60%" : "50%";
            const baseColor = `hsla(${hue}, ${sat}, 55%, 0.8)`;
            const lightColor = `hsla(${hue}, ${sat}, 72%, 0.85)`;
            const darkColor = `hsla(${hue}, ${sat}, 38%, 0.7)`;
            const suckerColor = `hsla(${hue}, 30%, 85%, 0.5)`;

            // 8 Tentacles
            const numTentacles = 8;
            for (let i = 0; i < numTentacles; i++) {
                ctx.save();
                const spreadAngle = (i / (numTentacles - 1)) * Math.PI * 0.8 + Math.PI * 0.1;
                const len = 55 + Math.sin(i * 1.5) * 10;
                const waveSpeed = scared ? 0.08 : 0.03;
                const waveAmp = scared ? 20 : 12;
                const wave = Math.sin(time * waveSpeed + i * 0.8) * waveAmp;
                const wave2 = Math.cos(time * (waveSpeed * 0.83) + i * 1.2) * (waveAmp * 0.66);

                const p0x = Math.cos(spreadAngle) * 12;
                const p0y = Math.sin(spreadAngle) * 8;
                const p1x = Math.cos(spreadAngle) * len * 0.5 + wave;
                const p1y = Math.sin(spreadAngle) * len * 0.5 + wave2;
                const p2x = Math.cos(spreadAngle) * len + wave * 1.5;
                const p2y = Math.sin(spreadAngle) * len + wave2 * 1.2;

                const segments = 12;
                const leftPts: { x: number; y: number }[] = [];
                const rightPts: { x: number; y: number }[] = [];
                for (let s = 0; s <= segments; s++) {
                    const t = s / segments;
                    const bx = (1 - t) * (1 - t) * p0x + 2 * (1 - t) * t * p1x + t * t * p2x;
                    const by = (1 - t) * (1 - t) * p0y + 2 * (1 - t) * t * p1y + t * t * p2y;
                    const dx = 2 * (1 - t) * (p1x - p0x) + 2 * t * (p2x - p1x);
                    const dy = 2 * (1 - t) * (p1y - p0y) + 2 * t * (p2y - p1y);
                    const nl = Math.sqrt(dx * dx + dy * dy) || 1;
                    const nx = -dy / nl, ny = dx / nl;
                    const width = (1 - t * 0.85) * 5;
                    leftPts.push({ x: bx + nx * width, y: by + ny * width });
                    rightPts.push({ x: bx - nx * width, y: by - ny * width });
                }
                ctx.beginPath();
                ctx.moveTo(leftPts[0].x, leftPts[0].y);
                for (let s = 1; s < leftPts.length; s++) ctx.lineTo(leftPts[s].x, leftPts[s].y);
                for (let s = rightPts.length - 1; s >= 0; s--) ctx.lineTo(rightPts[s].x, rightPts[s].y);
                ctx.closePath();

                const tentGrad = ctx.createLinearGradient(p0x, p0y, p2x, p2y);
                tentGrad.addColorStop(0, baseColor);
                tentGrad.addColorStop(1, lightColor);
                ctx.fillStyle = tentGrad;
                ctx.fill();

                for (let s = 2; s < segments; s += 2) {
                    const t = s / segments;
                    const bx = (1 - t) * (1 - t) * p0x + 2 * (1 - t) * t * p1x + t * t * p2x;
                    const by = (1 - t) * (1 - t) * p0y + 2 * (1 - t) * t * p1y + t * t * p2y;
                    ctx.beginPath();
                    ctx.arc(bx, by, (1 - t) * 2, 0, Math.PI * 2);
                    ctx.fillStyle = suckerColor;
                    ctx.fill();
                }
                ctx.restore();
            }

            // Head
            ctx.beginPath();
            ctx.ellipse(0, -18, 22, 30, 0, 0, Math.PI * 2);
            const headGrad = ctx.createRadialGradient(-5, -25, 3, 0, -15, 30);
            headGrad.addColorStop(0, lightColor);
            headGrad.addColorStop(0.6, baseColor);
            headGrad.addColorStop(1, darkColor);
            ctx.fillStyle = headGrad;
            ctx.fill();

            // Spots
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(Math.cos(i * 1.3) * 10, -18 + Math.sin(i * 2.1) * 12, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 30%, 60%, 0.4)`;
                ctx.fill();
            }

            // Eyes – widen when scared
            const eyeH = scared ? 9 : 7;
            ctx.fillStyle = "rgba(255,255,255,0.95)";
            ctx.beginPath(); ctx.ellipse(-9, -22, 6, eyeH, -0.1, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(9, -22, 6, eyeH, 0.1, 0, Math.PI * 2); ctx.fill();

            const lookX = Math.min(Math.max((pointer.x - ox) * 0.008, -3), 3);
            const lookY = Math.min(Math.max((pointer.y - oy) * 0.008, -3), 3);
            const pupilSize = scared ? 2 : 3.5;
            ctx.fillStyle = "rgba(30,30,30,0.9)";
            ctx.beginPath(); ctx.arc(-9 + lookX, -22 + lookY, pupilSize, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(9 + lookX, -22 + lookY, pupilSize, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = "rgba(255,255,255,0.8)";
            ctx.beginPath(); ctx.arc(-10 + lookX * 0.5, -23 + lookY * 0.5, 1.2, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(8 + lookX * 0.5, -23 + lookY * 0.5, 1.2, 0, Math.PI * 2); ctx.fill();

            ctx.restore();
        };

        // ── Ink cloud drawing ──
        const drawInkClouds = () => {
            for (let i = inkClouds.length - 1; i >= 0; i--) {
                const ink = inkClouds[i];
                ink.x += ink.vx;
                ink.y += ink.vy;
                ink.radius += 1.5;
                ink.opacity -= 0.008;
                ink.vx *= 0.97;
                ink.vy *= 0.97;

                if (ink.opacity <= 0) { inkClouds.splice(i, 1); continue; }

                ctx.save();
                const grad = ctx.createRadialGradient(ink.x, ink.y, 0, ink.x, ink.y, ink.radius);
                grad.addColorStop(0, `rgba(20, 10, 30, ${ink.opacity * 0.8})`);
                grad.addColorStop(0.4, `rgba(30, 15, 45, ${ink.opacity * 0.5})`);
                grad.addColorStop(1, `rgba(40, 20, 50, 0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(ink.x, ink.y, ink.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        };

        const sprayInk = (x: number, y: number, dirX: number, dirY: number) => {
            for (let i = 0; i < 8; i++) {
                inkClouds.push({
                    x: x + (Math.random() - 0.5) * 20,
                    y: y + (Math.random() - 0.5) * 20,
                    radius: Math.random() * 15 + 10,
                    opacity: 0.7 + Math.random() * 0.3,
                    vx: -dirX * (2 + Math.random() * 3) + (Math.random() - 0.5) * 2,
                    vy: -dirY * (2 + Math.random() * 3) + (Math.random() - 0.5) * 2,
                });
            }
        };

        // ── Octopus AI ──
        const updateOctopus = () => {
            const dx = pointer.x - octo.x;
            const dy = pointer.y - octo.y;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);
            const SCARE_RADIUS = 150;

            // Check if scared
            if (distToMouse < SCARE_RADIUS || pointer.clicked) {
                if (!octo.scared && distToMouse < SCARE_RADIUS) {
                    // Just got scared! Spray ink!
                    const fleeDirX = dx / (distToMouse || 1);
                    const fleeDirY = dy / (distToMouse || 1);
                    sprayInk(octo.x, octo.y, fleeDirX, fleeDirY);
                }
                octo.scared = true;
                octo.scaredTimer = 120; // ~2 seconds of scared state

                // Flee away from mouse
                if (distToMouse > 1) {
                    octo.vx -= (dx / distToMouse) * 1.5;
                    octo.vy -= (dy / distToMouse) * 1.5;
                }
                // Shift hue rapidly when scared (cycle through reds/oranges)
                octo.hue += 5;
                if (octo.hue > 360) octo.hue -= 360;
            }

            // Scared cooldown
            if (octo.scaredTimer > 0) {
                octo.scaredTimer--;
                if (octo.scaredTimer <= 0) {
                    octo.scared = false;
                }
            }

            // Gradually return to base hue when calm
            if (!octo.scared) {
                const hueDiff = octo.baseHue - octo.hue;
                // Handle wrapping
                if (Math.abs(hueDiff) > 180) {
                    octo.hue += hueDiff > 0 ? -2 : 2;
                } else {
                    octo.hue += hueDiff * 0.03;
                }
                if (octo.hue < 0) octo.hue += 360;
                if (octo.hue > 360) octo.hue -= 360;
            }

            // Wandering / crawling AI when not scared
            if (!octo.scared) {
                octo.idleTimer--;
                if (octo.idleTimer <= 0) {
                    // Pick a new random spot on screen to crawl to
                    octo.targetX = Math.random() * (canvas.width - 200) + 100;
                    octo.targetY = Math.random() * (canvas.height - 200) + 100;
                    octo.sitting = false;
                    octo.idleTimer = 300 + Math.random() * 400; // sit for 5-12 seconds at next stop
                }

                const tdx = octo.targetX - octo.x;
                const tdy = octo.targetY - octo.y;
                const tdist = Math.sqrt(tdx * tdx + tdy * tdy);

                if (tdist > 5) {
                    // Crawl towards target
                    octo.vx += (tdx / tdist) * 0.08;
                    octo.vy += (tdy / tdist) * 0.08;
                } else {
                    // Arrived, sit down
                    octo.sitting = true;
                }
            }

            // Apply velocity with friction
            const maxSpeed = octo.scared ? 8 : 1.5;
            const friction = octo.scared ? 0.96 : 0.92;
            octo.vx *= friction;
            octo.vy *= friction;

            const speed = Math.sqrt(octo.vx * octo.vx + octo.vy * octo.vy);
            if (speed > maxSpeed) {
                octo.vx = (octo.vx / speed) * maxSpeed;
                octo.vy = (octo.vy / speed) * maxSpeed;
            }

            octo.x += octo.vx;
            octo.y += octo.vy;

            // Keep on screen
            octo.x = Math.max(40, Math.min(canvas.width - 40, octo.x));
            octo.y = Math.max(40, Math.min(canvas.height - 40, octo.y));

            // Reset click
            pointer.clicked = false;
        };

        // ── Environment drawing ──
        const drawEnvironment = () => {
            const h = canvas.height;
            const w = canvas.width;

            // Caustic Light Rays
            ctx.save();
            ctx.globalCompositeOperation = "screen";
            ctx.fillStyle = "rgba(0, 150, 255, 0.02)";
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                const x1 = Math.sin(time * 0.001 + i) * 200 + w / 2;
                const x2 = Math.cos(time * 0.0015 + i) * 300 + w / 2;
                ctx.moveTo(x1, -100);
                ctx.lineTo(x2, h + 100);
                ctx.lineTo(x2 + 200, h + 100);
                ctx.lineTo(x1 + 100, -100);
                ctx.fill();
            }
            ctx.restore();

            // Seaweed
            const clusterPositions = [0.08, 0.18, 0.3, 0.42, 0.55, 0.65, 0.72, 0.92];
            clusterPositions.forEach((pct, ci) => {
                const cx = w * pct;
                const numBlades = 2 + (ci % 3);
                for (let b = 0; b < numBlades; b++) {
                    const bx = cx + (b - numBlades / 2) * 12;
                    const bh = 80 + Math.sin(ci * 3 + b * 7) * 50 + b * 15;
                    const bw = 8 + Math.sin(ci * 5 + b) * 3;
                    drawSeaweedBlade(bx, h, bh, bw, ci * 10 + b);
                }
            });

            // Bubbles
            ctx.save();
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.strokeStyle = "rgba(255,255,255,0.8)";
            ctx.lineWidth = 1;
            for (let i = bubbles.length - 1; i >= 0; i--) {
                const b = bubbles[i];
                b.y -= b.speed;
                b.wobble += b.wobbleSpeed;
                const wx = b.x + Math.sin(b.wobble) * 15;
                ctx.beginPath(); ctx.arc(wx, b.y, b.size, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "rgba(255,255,255,0.8)";
                ctx.beginPath(); ctx.arc(wx - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "rgba(255,255,255,0.4)";
                if (b.y < -20) bubbles.splice(i, 1);
            }
            ctx.restore();
            if (Math.random() < 0.1) spawnBubble();
        };

        // ── Fish drawing ──
        const drawFish = (fish: Fish) => {
            ctx.save();
            const scale = 1 + fish.z * 0.015;
            ctx.translate(fish.x, fish.y);
            if (fish.z > 0) {
                ctx.shadowColor = "rgba(0,0,0,0.5)";
                ctx.shadowBlur = fish.z;
                ctx.shadowOffsetX = fish.z * 0.5;
                ctx.shadowOffsetY = fish.z;
            }
            ctx.scale(scale, scale);
            ctx.rotate(Math.atan2(fish.vy, fish.vx));
            ctx.fillStyle = fish.color;

            if (fish.isShark) {
                ctx.beginPath(); ctx.ellipse(0, 0, fish.size, fish.size / 3, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(fish.size * 0.8, -fish.size * 0.1); ctx.lineTo(fish.size * 1.5, 0); ctx.lineTo(fish.size * 0.8, fish.size * 0.1); ctx.fill();
                ctx.beginPath(); ctx.moveTo(-fish.size * 0.2, 0); ctx.quadraticCurveTo(-fish.size * 0.5, -fish.size * 1.2, -fish.size * 1.2, -fish.size * 0.8); ctx.lineTo(-fish.size * 0.8, 0); ctx.fill();
                ctx.beginPath(); ctx.moveTo(-fish.size + 5, 0); ctx.lineTo(-fish.size - 25, -25); ctx.lineTo(-fish.size - 20, 0); ctx.lineTo(-fish.size - 25, 25); ctx.fill();
                ctx.fillStyle = "black"; ctx.beginPath(); ctx.arc(fish.size * 0.8, -fish.size * 0.15, 3, 0, Math.PI * 2); ctx.fill();
            } else if (fish.isBig) {
                ctx.beginPath(); ctx.ellipse(0, 0, fish.size, fish.size / 2, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(-fish.size + 2, 0); ctx.lineTo(-fish.size - 10, -10); ctx.lineTo(-fish.size - 10, 10); ctx.fill();
                ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.beginPath(); ctx.moveTo(0, -fish.size / 2); ctx.quadraticCurveTo(-5, -fish.size, -10, -fish.size / 2); ctx.fill();
                ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(fish.size / 2, -fish.size / 4, 3, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "black"; ctx.beginPath(); ctx.arc(fish.size / 2 + 1, -fish.size / 4, 1.5, 0, Math.PI * 2); ctx.fill();
            } else {
                ctx.beginPath(); ctx.ellipse(0, 0, fish.size, fish.size / 2, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(-fish.size + 1, 0); ctx.lineTo(-fish.size - 5, -5); ctx.lineTo(-fish.size - 5, 5); ctx.fill();
            }
            ctx.restore();
        };

        // ── Main loop ──
        const update = () => {
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawEnvironment();

            // Update & draw ink clouds (behind octopus)
            drawInkClouds();

            // Update octopus AI
            updateOctopus();
            drawOctopusBody(octo.x, octo.y, octo.hue, octo.scared);

            // Fish AI
            const smallFishes = fishes.filter((f) => !f.isBig && !f.isShark);
            const bigFishes = fishes.filter((f) => f.isBig && !f.isShark);
            const sharks = fishes.filter((f) => f.isShark);
            fishes.sort((a, b) => a.z - b.z);

            fishes.forEach((fish) => {
                fish.z += fish.vz;
                if (fish.z > 0) { fish.vz -= 0.5; } else { fish.z = 0; fish.vz = 0; }
                fish.x += fish.vx;
                fish.y += fish.vy;

                if (fish.x > canvas.width + 100) fish.x = -100;
                if (fish.x < -100) fish.x = canvas.width + 100;
                if (fish.y > canvas.height + 100) fish.y = -100;
                if (fish.y < -100) fish.y = canvas.height + 100;

                if (fish.z === 0) {
                    if (fish.isShark) {
                        let nearestDist = Infinity;
                        let nearestFish: Fish | null = null;
                        bigFishes.forEach((big) => {
                            const ddx = big.x - fish.x, ddy = big.y - fish.y;
                            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                            if (dist < nearestDist) { nearestDist = dist; nearestFish = big; }
                        });
                        const target = nearestFish as Fish | null;
                        if (target && nearestDist < 400) {
                            fish.vx += ((target.x - fish.x) / nearestDist) * 0.02;
                            fish.vy += ((target.y - fish.y) / nearestDist) * 0.02;
                        } else {
                            fish.vx += (Math.random() - 0.5) * 0.05;
                            fish.vy += (Math.random() - 0.5) * 0.05;
                        }
                        const sp = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);
                        if (sp > 3) { fish.vx = (fish.vx / sp) * 3; fish.vy = (fish.vy / sp) * 3; }
                    } else if (fish.isBig) {
                        const dxM = fish.x - pointer.x, dyM = fish.y - pointer.y;
                        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
                        let inDanger = false, fleeDx = 0, fleeDy = 0;
                        sharks.forEach((shark) => {
                            const ddx = fish.x - shark.x, ddy = fish.y - shark.y;
                            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                            if (dist < shark.size) { fish.x = Math.random() * canvas.width; fish.y = -50; }
                            else if (dist < 250) { fleeDx += ddx / dist; fleeDy += ddy / dist; inDanger = true; }
                        });
                        if (distM < 200) {
                            const force = (200 - distM) / 200;
                            fish.vx += (dxM / distM) * force * 0.5;
                            fish.vy += (dyM / distM) * force * 0.5;
                        } else if (inDanger) {
                            fish.vx += fleeDx * 0.15; fish.vy += fleeDy * 0.15;
                        } else {
                            let nd = Infinity; let nf: Fish | null = null;
                            smallFishes.forEach((s) => { const ddx = s.x - fish.x, ddy = s.y - fish.y; const d = Math.sqrt(ddx * ddx + ddy * ddy); if (d < nd) { nd = d; nf = s; } });
                            const prey = nf as Fish | null;
                            if (prey && nd < 250) { fish.vx += ((prey.x - fish.x) / nd) * 0.05; fish.vy += ((prey.y - fish.y) / nd) * 0.05; }
                            else { fish.vx += (Math.random() - 0.5) * 0.2; fish.vy += (Math.random() - 0.5) * 0.2; }
                        }
                        const sp = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);
                        if (sp > 4) { fish.vx = (fish.vx / sp) * 4; fish.vy = (fish.vy / sp) * 4; }
                    } else {
                        let fleeDx = 0, fleeDy = 0, inDanger = false;
                        bigFishes.forEach((big) => {
                            const ddx = fish.x - big.x, ddy = fish.y - big.y;
                            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                            if (dist < big.size) { fish.x = Math.random() * canvas.width; fish.y = Math.random() > 0.5 ? -10 : canvas.height + 10; }
                            else if (dist < 150) { fleeDx += ddx / dist; fleeDy += ddy / dist; inDanger = true; }
                        });
                        sharks.forEach((shark) => {
                            const ddx = fish.x - shark.x, ddy = fish.y - shark.y;
                            const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                            if (dist < 200) { fleeDx += ddx / dist; fleeDy += ddy / dist; inDanger = true; }
                        });
                        if (inDanger) { fish.vx += fleeDx * 0.1; fish.vy += fleeDy * 0.1; }
                        else { fish.vx += (Math.random() - 0.5) * 0.1; fish.vy += (Math.random() - 0.5) * 0.1; }
                        const sp = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);
                        if (sp > 2.5) { fish.vx = (fish.vx / sp) * 2.5; fish.vy = (fish.vy / sp) * 2.5; }
                    }
                }
                drawFish(fish);
            });

            animationFrameId = requestAnimationFrame(update);
        };

        update();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1]"
            style={{ background: "transparent" }}
        />
    );
}
