export const useTimeline = () => {
    const visibleRange = {
        start: 0,  
        end: 24 * 60
    };

    const getSeancePosition = (seanceTime: string, containerWidth: number) => {
        const [hours, minutes] = seanceTime.split(':').map(Number);
        
        const startMinutes = hours * 60 + minutes;

        const rangeMinutes = visibleRange.end - visibleRange.start;
        const left = ((startMinutes - visibleRange.start) / rangeMinutes) * containerWidth; 
        
        const seanceWidth = containerWidth <= 480 ? 56 : 70;
        const clampedLeft = Math.max(0, Math.min(containerWidth - seanceWidth, left));

        return {
            left: `${clampedLeft}px`
        };
    };

    return { getSeancePosition };
};
