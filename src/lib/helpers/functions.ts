import { useEffect, useState } from "react";

export function useAnimatedCounter(target: number | undefined, duration: number = 1000): number | undefined {
    const [count, setCount] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (target === undefined) {
            setCount(undefined);
            return;
        }

        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            if (elapsed < duration) {
                const progress = elapsed / duration;
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(easedProgress * target));
                requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(step);
    }, [target, duration]);

    return count;
}
