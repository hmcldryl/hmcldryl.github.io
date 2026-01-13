"use client";

export function GameDetails() {
  return (
    <div
      className="w-full py-4 px-4"
      style={{ maxWidth: "calc(70vh * 16 / 9)" }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Instructions & Controls */}
          <div className="space-y-6">
            {/* Game Instructions */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                How to Play
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Ride your bike through an endless scrolling world</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Collect pizzas to earn points</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Jump over monsters to avoid getting hit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>
                    Low pizzas can only be collected while on the ground
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>High pizzas require jumping to collect</span>
                </li>
              </ul>
            </section>

            {/* Points System */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Scoring</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between items-center">
                  <span>🍕 Collect Pizza</span>
                  <span className="font-bold text-green-600">+10 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>👾 Kill Monster (jump)</span>
                  <span className="font-bold text-green-600">+50 points</span>
                </div>
              </div>
            </section>

            {/* Technologies */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Technologies Used
              </h2>
              <div className="grid grid-cols-2 gap-3 text-gray-700">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">▸</span>
                  <span>Next.js 16</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">▸</span>
                  <span>React 19</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">▸</span>
                  <span>TypeScript</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">▸</span>
                  <span>HTML5 Canvas</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">▸</span>
                  <span>Tailwind CSS</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Technologies & Credits */}
          <div className="space-y-6">
            {/* Controls */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Controls
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center">
                  <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono mr-3">
                    A
                  </kbd>
                  <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono mr-3">
                    ←
                  </kbd>
                  <span>Move Left</span>
                </div>
                <div className="flex items-center">
                  <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono mr-3">
                    D
                  </kbd>
                  <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono mr-3">
                    →
                  </kbd>
                  <span>Move Right</span>
                </div>
                <div className="flex items-center">
                  <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono mr-3">
                    W
                  </kbd>
                  <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono mr-3">
                    ↑
                  </kbd>
                  <kbd className="px-3 py-1 bg-gray-200 rounded text-sm font-mono mr-3">
                    Space
                  </kbd>
                  <span>Jump (Bunny Hop)</span>
                </div>
              </div>
            </section>

            {/* Credits */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Credits</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Music</h3>
                  <p className="text-sm">
                    "Cloud Dancer" by{" "}
                    <a
                      href="https://incompetech.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Kevin MacLeod
                    </a>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Licensed under{" "}
                    <a
                      href="https://creativecommons.org/licenses/by/4.0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Creative Commons: By Attribution 4.0
                    </a>
                  </p>
                  <p className="text-xs text-gray-500">
                    Source:{" "}
                    <a
                      href="https://incompetech.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      incompetech.com
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
