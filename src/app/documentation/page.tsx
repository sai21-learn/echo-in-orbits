'use client'

export default function DocumentationPage() {
    return (
        <main className="relative min-h-screen bg-black text-white pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6 space-y-16">
                {/* Header */}
                <header className="space-y-4">
                    <h1 className="text-5xl font-light tracking-wider">Documentation</h1>
                    <p className="text-white/60 font-light text-lg">
                        Technical deep-dive into Echoes in Orbit: algorithms, challenges, and solutions.
                    </p>
                </header>

                {/* Overview */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-light tracking-wide border-b border-white/10 pb-3">Overview</h2>
                    <p className="text-white/70 font-light leading-relaxed">
                        Echoes in Orbit is a 3D interactive planetarium built with modern web technologies.
                        Users can post confessions (echoes) that are mapped onto a spherical surface, creating
                        an immersive cosmic experience.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/80 mb-4">Technology Stack</h3>
                        <ul className="space-y-2 text-white/60 font-light">
                            <li className="flex items-start gap-2">
                                <span className="text-white/30">•</span>
                                <span><strong className="text-white/80">Next.js 16</strong> - React framework with App Router</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30">•</span>
                                <span><strong className="text-white/80">Three.js + React Three Fiber</strong> - 3D rendering</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30">•</span>
                                <span><strong className="text-white/80">Supabase</strong> - PostgreSQL database and real-time subscriptions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30">•</span>
                                <span><strong className="text-white/80">Clerk</strong> - Authentication (optional anonymous posting)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30">•</span>
                                <span><strong className="text-white/80">TailwindCSS</strong> - Styling</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Spherical Distribution */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-light tracking-wide border-b border-white/10 pb-3">Spherical Distribution Algorithm</h2>
                    <p className="text-white/70 font-light leading-relaxed">
                        The core challenge was distributing stars evenly across a sphere surface while maintaining
                        category-based zones. We use a modified Fibonacci sphere algorithm.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/80">Mathematical Foundation</h3>
                        <p className="text-white/60 font-light text-sm leading-relaxed">
                            Stars are positioned using spherical coordinates (θ, φ) and converted to Cartesian (x, y, z):
                        </p>
                        <pre className="bg-black/50 border border-white/10 rounded p-4 text-sm text-white/80 font-mono overflow-x-auto">
                            {`x = radius × sin(φ) × cos(θ)
y = radius × cos(φ)
z = radius × sin(φ) × sin(θ)`}
                        </pre>
                        <p className="text-white/60 font-light text-sm leading-relaxed">
                            Where:
                        </p>
                        <ul className="text-white/60 font-light text-sm space-y-1 ml-4">
                            <li>• <strong>radius</strong> = 200 units (planetarium dome)</li>
                            <li>• <strong>θ</strong> (theta) = azimuthal angle (0 to 2π)</li>
                            <li>• <strong>φ</strong> (phi) = polar angle (0 to π)</li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/80">Category Zones</h3>
                        <p className="text-white/60 font-light text-sm leading-relaxed">
                            Each category occupies a specific zone on the sphere:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-black/30 rounded p-3">
                                <div className="text-[#fbbf24] font-medium mb-1">Hope</div>
                                <div className="text-white/50 font-light">Top-front-right quadrant</div>
                            </div>
                            <div className="bg-black/30 rounded p-3">
                                <div className="text-[#8b5cf6] font-medium mb-1">Regret</div>
                                <div className="text-white/50 font-light">Top-back-left quadrant</div>
                            </div>
                            <div className="bg-black/30 rounded p-3">
                                <div className="text-[#3b82f6] font-medium mb-1">Advice</div>
                                <div className="text-white/50 font-light">Middle band (wraps around)</div>
                            </div>
                            <div className="bg-black/30 rounded p-3">
                                <div className="text-[#ec4899] font-medium mb-1">Dream</div>
                                <div className="text-white/50 font-light">Bottom-front-right</div>
                            </div>
                            <div className="bg-black/30 rounded p-3 md:col-span-2">
                                <div className="text-[#10b981] font-medium mb-1">Gratitude</div>
                                <div className="text-white/50 font-light">Bottom-back-left</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/80">Fibonacci Sphere Technique</h3>
                        <p className="text-white/60 font-light text-sm leading-relaxed">
                            To achieve even distribution within zones, we use the golden angle:
                        </p>
                        <pre className="bg-black/50 border border-white/10 rounded p-4 text-sm text-white/80 font-mono overflow-x-auto">
                            {`const goldenRatio = (1 + √5) / 2
const goldenAngle = 2π / goldenRatio²

// Distribute using golden angle
theta = zoneStart + (index × goldenAngle) % zoneRange
phi = zoneStart + (index / totalStars) × zoneRange`}
                        </pre>
                        <p className="text-white/60 font-light text-sm leading-relaxed mt-3">
                            This prevents clustering and creates natural-looking star fields.
                        </p>
                    </div>
                </section>

                {/* Camera System */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-light tracking-wide border-b border-white/10 pb-3">Camera System</h2>
                    <p className="text-white/70 font-light leading-relaxed">
                        The camera is positioned at the center of the sphere, creating a true planetarium experience
                        where users look outward at stars surrounding them.
                    </p>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/80">Configuration</h3>
                        <pre className="bg-black/50 border border-white/10 rounded p-4 text-sm text-white/80 font-mono overflow-x-auto">
                            {`<Canvas
  camera={{ 
    position: [0, 0, 0],  // Center of sphere
    fov: 75               // Wide field of view
  }}
/>`}
                        </pre>
                        <ul className="text-white/60 font-light text-sm space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-white/30">•</span>
                                <span><strong className="text-white/80">Position (0,0,0)</strong>: Camera at sphere center</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30">•</span>
                                <span><strong className="text-white/80">FOV 75°</strong>: Wide angle for immersive view</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-white/30">•</span>
                                <span><strong className="text-white/80">OrbitControls</strong>: Rotate view with mouse/touch</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/80">Controls</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-black/30 rounded p-3">
                                <div className="text-white/80 font-medium mb-2">Touch</div>
                                <ul className="text-white/50 font-light space-y-1">
                                    <li>• Pinch to zoom</li>
                                    <li>• Drag to rotate</li>
                                    <li>• Tap to select</li>
                                </ul>
                            </div>
                            <div className="bg-black/30 rounded p-3">
                                <div className="text-white/80 font-medium mb-2">Mouse</div>
                                <ul className="text-white/50 font-light space-y-1">
                                    <li>• Scroll to zoom</li>
                                    <li>• Drag to rotate</li>
                                    <li>• Click to select</li>
                                </ul>
                            </div>
                            <div className="bg-black/30 rounded p-3">
                                <div className="text-white/80 font-medium mb-2">Keyboard</div>
                                <ul className="text-white/50 font-light space-y-1">
                                    <li>• WASD to move</li>
                                    <li>• Arrow keys rotate</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Challenges & Solutions */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-light tracking-wide border-b border-white/10 pb-3">Challenges & Solutions</h2>

                    {/* Challenge 1 */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-lg font-light text-white/90">Challenge 1: Sphere Scale & Visibility</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-white/50 font-medium mb-1">Problem:</div>
                                <p className="text-white/60 font-light">
                                    Initial 500-unit sphere radius made stars appear tiny or invisible from camera position.
                                </p>
                            </div>
                            <div>
                                <div className="text-white/50 font-medium mb-1">Solution:</div>
                                <p className="text-white/60 font-light">
                                    Reduced sphere radius to 200 units and increased star sizes (30-45 units).
                                    Positioned camera at (0,0,0) for optimal viewing distance.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Challenge 2 */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-lg font-light text-white/90">Challenge 2: Star Distribution Clustering</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-white/50 font-medium mb-1">Problem:</div>
                                <p className="text-white/60 font-light">
                                    Initial random distribution created visible clusters and gaps, breaking immersion.
                                </p>
                            </div>
                            <div>
                                <div className="text-white/50 font-medium mb-1">Solution:</div>
                                <p className="text-white/60 font-light">
                                    Implemented Fibonacci sphere algorithm using golden angle spacing.
                                    Added organic noise (±0.15-0.3 radians) for natural variation while maintaining even coverage.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Challenge 3 */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-lg font-light text-white/90">Challenge 3: WebGL Context Errors</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-white/50 font-medium mb-1">Problem:</div>
                                <p className="text-white/60 font-light">
                                    Some users encountered WebGL context creation failures due to browser/GPU limitations.
                                </p>
                            </div>
                            <div>
                                <div className="text-white/50 font-medium mb-1">Solution:</div>
                                <p className="text-white/60 font-light">
                                    Added error boundary with WebGL detection. Shows helpful fallback UI with troubleshooting
                                    steps (enable hardware acceleration, update drivers, try different browser).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Challenge 4 */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-lg font-light text-white/90">Challenge 4: Click Detection on Points</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-white/50 font-medium mb-1">Problem:</div>
                                <p className="text-white/60 font-light">
                                    Three.js Points geometry has poor raycasting, making stars difficult to click.
                                </p>
                            </div>
                            <div>
                                <div className="text-white/50 font-medium mb-1">Solution:</div>
                                <p className="text-white/60 font-light">
                                    Created invisible sphere meshes (radius 2) at each star position for click detection.
                                    Visual Points remain for glow effect, spheres handle interaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Visual Effects */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-light tracking-wide border-b border-white/10 pb-3">Visual Effects</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
                            <h3 className="text-lg font-light text-white/90">Pulsing Stars</h3>
                            <p className="text-white/60 font-light text-sm">
                                Custom shader with time-based sine wave creates subtle breathing effect.
                                Amplitude: 10%, frequency: 0.5Hz.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
                            <h3 className="text-lg font-light text-white/90">Constellation Lines</h3>
                            <p className="text-white/60 font-light text-sm">
                                Connects nearest neighbors within galaxies using THREE.Line.
                                Toggleable, color-coded by category, 15% opacity.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
                            <h3 className="text-lg font-light text-white/90">Dome Grid</h3>
                            <p className="text-white/60 font-light text-sm">
                                Spherical wireframe (200-unit radius) with 24 radial lines and 12 latitude rings.
                                Subtle 5% opacity for spatial reference.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-3">
                            <h3 className="text-lg font-light text-white/90">Cosmic Background</h3>
                            <p className="text-white/60 font-light text-sm">
                                Layered nebula shader with noise functions. Creates depth and atmosphere
                                without overwhelming foreground stars.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Database Schema */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-light tracking-wide border-b border-white/10 pb-3">Database Schema</h2>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/80">Messages Table</h3>
                        <pre className="bg-black/50 border border-white/10 rounded p-4 text-sm text-white/80 font-mono overflow-x-auto">
                            {`CREATE TABLE messages (
  id UUID PRIMARY KEY,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  position JSONB NOT NULL,  -- {x, y, z}
  is_locked BOOLEAN DEFAULT false,
  unlock_at TIMESTAMPTZ,
  user_id TEXT,
  session_id TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
                        </pre>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h3 className="text-sm font-medium tracking-wider uppercase text-white/80">Comments & Likes</h3>
                        <pre className="bg-black/50 border border-white/10 rounded p-4 text-sm text-white/80 font-mono overflow-x-auto">
                            {`CREATE TABLE comments (
  id UUID PRIMARY KEY,
  message_id UUID REFERENCES messages(id),
  user_id TEXT,
  session_id TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE likes (
  message_id UUID REFERENCES messages(id),
  user_id TEXT,
  session_id TEXT,
  PRIMARY KEY (message_id, COALESCE(user_id, session_id))
);`}
                        </pre>
                    </div>
                </section>

                {/* Footer */}
                <footer className="pt-12 border-t border-white/10">
                    <p className="text-white/40 font-light text-sm text-center">
                        Built with ❤️ using Next.js, Three.js, and Supabase
                    </p>
                </footer>
            </div>
        </main>
    )
}
