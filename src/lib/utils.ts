import { Vector3 } from 'three';

/**
 * Galaxy Spiral Distribution Algorithm
 * Creates 5 distinct galaxy regions with spiral arms for message categories
 */
export function generateStarPosition(
    category: string,
    index: number
): { x: number; y: number; z: number } {

    const GALAXY_CENTERS: Record<string, { x: number; y: number; z: number }> = {
        hope: { x: 600, y: 400, z: 0 },   // Extreme separation
        regret: { x: -600, y: 400, z: 0 },
        advice: { x: 0, y: -400, z: 600 },
        dream: { x: 600, y: -400, z: 0 },
        gratitude: { x: -600, y: -400, z: 0 }
    }

    const center = GALAXY_CENTERS[category] || { x: 0, y: 0, z: 0 }
    const GALAXY_RADIUS = 300 // Massive galaxies
    const SPIRAL_TIGHTNESS = 1.2
    const VERTICAL_COMPRESSION = 0.1 // Very flat

    // Spiral calculation with high randomness
    const angle = index * SPIRAL_TIGHTNESS + Math.random() * 2.0
    const radius = 60 + Math.sqrt(index) * 25 // Wide inner clearing
    const clampedRadius = Math.min(radius, GALAXY_RADIUS)

    // Position on spiral arm
    const x = center.x + Math.cos(angle) * clampedRadius
    const y = center.y + Math.sin(angle) * clampedRadius * VERTICAL_COMPRESSION
    const z = center.z + (Math.random() - 0.5) * 80

    // Organic noise (±40 units for wide star fields)
    const noise = {
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40
    }

    return {
        x: x + noise.x,
        y: y + noise.y,
        z: z + noise.z
    }
}

/**
 * Get color for category
 */
export function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        hope: '#fbbf24',      // Amber
        regret: '#8b5cf6',    // Purple
        advice: '#3b82f6',    // Blue
        dream: '#ec4899',     // Pink
        gratitude: '#10b981'  // Green
    }
    return colors[category] || '#ffffff'
}

/**
 * Generate random star brightness
 */
export function generateStarBrightness(): number {
    return 0.6 + Math.random() * 0.8 // 0.6 to 1.4
}

/**
 * Calculates star brightness based on lock status and likes.
 */
export function calculateBrightness(isLocked: boolean, likes: number): number {
    const baseBrightness = isLocked ? 0.2 : 0.4;
    const brightness = baseBrightness + likes * 0.05;
    // Clamp between 0.2 and 2.0
    return Math.min(Math.max(brightness, 0.2), 2.0);
}
