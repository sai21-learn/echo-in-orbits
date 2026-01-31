'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CosmicBackground() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        if (meshRef.current && meshRef.current.material) {
            const material = meshRef.current.material as THREE.ShaderMaterial
            material.uniforms.time.value = clock.elapsedTime * 0.05
        }
    })

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

    const fragmentShader = `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;
    
    // Simple noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      // Multi-layer noise for nebula effect
      float n1 = noise(vUv * 3.0 + time);
      float n2 = noise(vUv * 6.0 - time * 0.5);
      float n3 = noise(vUv * 12.0 + time * 0.3);
      
      float combined = (n1 + n2 * 0.5 + n3 * 0.25) / 1.75;
      
      // Mix colors based on noise
      vec3 finalColor = mix(color1, color2, combined);
      finalColor = mix(finalColor, color3, n2);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[400, 64, 64]} />
            <shaderMaterial
                side={THREE.BackSide}
                uniforms={{
                    time: { value: 0 },
                    color1: { value: new THREE.Color('#0a0a0f') }, // Deep black
                    color2: { value: new THREE.Color('#1a0b2e') }, // Dark purple
                    color3: { value: new THREE.Color('#16213e') }  // Dark blue
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    )
}
