import { Vector3 } from 'three';

/**
 * Spherical Planetarium Distribution
 * Maps stars evenly onto a sphere surface using Fibonacci sphere algorithm
 */
export function generateStarPosition(
    category: string,
    index: number
): { x: number; y: number; z: number } {

    const SPHERE_RADIUS = 200 // Planetarium dome radius

    // Define zones on sphere for each category using normalized coordinates
    // Each category gets a section of the sphere
    const CATEGORY_ZONES: Record<string, { phiStart: number; phiEnd: number; thetaStart: number; thetaEnd: number }> = {
        hope: { phiStart: 0, phiEnd: 0.5, thetaStart: 0, thetaEnd: 0.5 },   // Top-front-right
        regret: { phiStart: 0, phiEnd: 0.5, thetaStart: 0.5, thetaEnd: 1.0 },   // Top-back-left
        advice: { phiStart: 0.5, phiEnd: 0.75, thetaStart: 0, thetaEnd: 1.0 },   // Middle band
        dream: { phiStart: 0.75, phiEnd: 1.0, thetaStart: 0, thetaEnd: 0.5 },   // Bottom-front-right
        gratitude: { phiStart: 0.75, phiEnd: 1.0, thetaStart: 0.5, thetaEnd: 1.0 }    // Bottom-back-left
    }

    const zone = CATEGORY_ZONES[category] || { phiStart: 0, phiEnd: 1, thetaStart: 0, thetaEnd: 1 }

    // Use Fibonacci spiral for even distribution within zone
    const goldenRatio = (1 + Math.sqrt(5)) / 2
    const goldenAngle = 2 * Math.PI / goldenRatio

    // Normalize index to 0-1 range (assuming max ~20 stars per category)
    const normalizedIndex = (index % 20) / 20

    // Calculate phi (polar angle, 0 to π)
    const phiRange = zone.phiEnd - zone.phiStart
    const phi = (zone.phiStart + normalizedIndex * phiRange) * Math.PI

    // Calculate theta (azimuthal angle, 0 to 2π)  
    const thetaRange = zone.thetaEnd - zone.thetaStart
    const theta = (zone.thetaStart + ((index * goldenAngle) % (thetaRange * 2 * Math.PI))) * 2 * Math.PI

    // Add small random variation for organic feel
    const phiNoise = (Math.random() - 0.5) * 0.15
    const thetaNoise = (Math.random() - 0.5) * 0.15

    const finalPhi = Math.max(0.1, Math.min(Math.PI - 0.1, phi + phiNoise))
    const finalTheta = theta + thetaNoise

    // Convert spherical to Cartesian coordinates
    // Standard spherical coordinate conversion:
    // x = r * sin(phi) * cos(theta)
    // y = r * cos(phi)  
    // z = r * sin(phi) * sin(theta)
    const x = SPHERE_RADIUS * Math.sin(finalPhi) * Math.cos(finalTheta)
    const y = SPHERE_RADIUS * Math.cos(finalPhi)
    const z = SPHERE_RADIUS * Math.sin(finalPhi) * Math.sin(finalTheta)

    return { x, y, z }
}

/**
 * Get color for category
 */
export function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        hope: '#fbbf24',
        regret: '#8b5cf6',
        advice: '#3b82f6',
        dream: '#ec4899',
        gratitude: '#10b981'
    };
    return colors[category] || '#ffeebb';
}

/**
 * Calculate star brightness based on locked status and likes
 */
export function calculateBrightness(isLocked: boolean, likes: number): number {
    const baseBrightness = isLocked ? 0.5 : 1.0;
    const likesBoost = Math.min(likes * 0.1, 0.5);
    return baseBrightness + likesBoost;
}

/**
 * Generate random star brightness for seeding
 */
export function generateStarBrightness(): number {
    return 0.7 + Math.random() * 0.3;
}
