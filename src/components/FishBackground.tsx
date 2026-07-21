import { useEffect, useRef } from "react";

interface Fish {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    isBig: boolean;
    targetX?: number;
    targetY?: number;
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

        // Mouse pointer
        let pointer = { x: -1000, y: -1000 };

        const handleMouseMove = (e: MouseEvent) => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const spawnSmallFish = (count: number) => {
            for (let i = 0; i < count; i++) {
                fishes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    size: Math.random() * 4 + 4,
                    color: `hsl(${Math.random() * 60 + 180}, 80%, 60%)`, // Blueish colors
                    isBig: false,
                });
            }
        };

        const spawnBigFish = () => {
            for (let i = 0; i < 3; i++) {
                fishes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 3,
                    vy: (Math.random() - 0.5) * 3,
                    size: Math.random() * 8 + 25,
                    color: `hsl(${Math.random() * 60 + 0}, 80%, 50%)`, // Reddish/Orange colors
                    isBig: true,
                });
            }
        };

        spawnSmallFish(70);
        spawnBigFish();

        const drawFish = (fish: Fish) => {
            ctx.save();
            ctx.translate(fish.x, fish.y);
            const angle = Math.atan2(fish.vy, fish.vx);
            ctx.rotate(angle);

            ctx.fillStyle = fish.color;
            ctx.beginPath();

            if (fish.isBig) {
                // Draw big fish
                ctx.ellipse(0, 0, fish.size, fish.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                // Tail
                ctx.beginPath();
                ctx.moveTo(-fish.size + 2, 0);
                ctx.lineTo(-fish.size - 15, -15);
                ctx.lineTo(-fish.size - 15, 15);
                ctx.fill();
                // Eye
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(fish.size / 2, -fish.size / 4, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(fish.size / 2 + 1, -fish.size / 4, 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Draw small fish
                ctx.ellipse(0, 0, fish.size, fish.size / 2, 0, 0, Math.PI * 2);
                ctx.fill();
                // Tail
                ctx.beginPath();
                ctx.moveTo(-fish.size + 1, 0);
                ctx.lineTo(-fish.size - 5, -5);
                ctx.lineTo(-fish.size - 5, 5);
                ctx.fill();
            }

            ctx.restore();
        };

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const smallFishes = fishes.filter((f) => !f.isBig);
            const bigFishes = fishes.filter((f) => f.isBig);

            fishes.forEach((fish) => {
                // Basic movement
                fish.x += fish.vx;
                fish.y += fish.vy;

                // Screen wrap
                if (fish.x > canvas.width + 50) fish.x = -50;
                if (fish.x < -50) fish.x = canvas.width + 50;
                if (fish.y > canvas.height + 50) fish.y = -50;
                if (fish.y < -50) fish.y = canvas.height + 50;

                if (fish.isBig) {
                    // Big fish flee from mouse
                    const dxMouse = fish.x - pointer.x;
                    const dyMouse = fish.y - pointer.y;
                    const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                    if (distMouse < 200) {
                        // Flee mouse
                        const force = (200 - distMouse) / 200;
                        fish.vx += (dxMouse / distMouse) * force * 0.5;
                        fish.vy += (dyMouse / distMouse) * force * 0.5;
                    } else {
                        // Chase nearest small fish
                        let nearestDist = Infinity;
                        let nearestFish: Fish | null = null;

                        smallFishes.forEach((small) => {
                            const dx = small.x - fish.x;
                            const dy = small.y - fish.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < nearestDist) {
                                nearestDist = dist;
                                nearestFish = small;
                            }
                        });

                        if (nearestFish && nearestDist < 300) {
                            const target = nearestFish as Fish;
                            const dx = target.x - fish.x;
                            const dy = target.y - fish.y;
                            // Steer towards
                            fish.vx += (dx / nearestDist) * 0.05;
                            fish.vy += (dy / nearestDist) * 0.05;
                        } else {
                            // Wander
                            fish.vx += (Math.random() - 0.5) * 0.2;
                            fish.vy += (Math.random() - 0.5) * 0.2;
                        }

                        // Limit speed
                        const speed = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);
                        if (speed > 4) {
                            fish.vx = (fish.vx / speed) * 4;
                            fish.vy = (fish.vy / speed) * 4;
                        }
                    }
                } else {
                    // Small fish wander and avoid big fish
                    let fleeDx = 0;
                    let fleeDy = 0;
                    let inDanger = false;

                    bigFishes.forEach((big) => {
                        const dx = fish.x - big.x;
                        const dy = fish.y - big.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        // If very close to a big fish, get eaten
                        if (dist < big.size) {
                            fish.x = Math.random() * canvas.width;
                            fish.y = Math.random() > 0.5 ? -10 : canvas.height + 10;
                        } else if (dist < 150) {
                            fleeDx += dx / dist;
                            fleeDy += dy / dist;
                            inDanger = true;
                        }
                    });

                    if (inDanger) {
                        fish.vx += fleeDx * 0.1;
                        fish.vy += fleeDy * 0.1;
                    } else {
                        fish.vx += (Math.random() - 0.5) * 0.1;
                        fish.vy += (Math.random() - 0.5) * 0.1;
                    }

                    // Limit speed
                    const speed = Math.sqrt(fish.vx * fish.vx + fish.vy * fish.vy);
                    if (speed > 2.5) {
                        fish.vx = (fish.vx / speed) * 2.5;
                        fish.vy = (fish.vy / speed) * 2.5;
                    }
                }

                drawFish(fish);
            });

            animationFrameId = requestAnimationFrame(update);
        };

        update();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
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
