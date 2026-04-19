import { useEffect, useRef } from "react";

export function useRenderCount(componentName?: string) {
    const count = useRef(0);
    count.current += 1;

    useEffect(() => {
        const label = componentName ?? "Component";
        console.log(`[${label}] render #${count.current}`);
    });

    return count.current;
}
