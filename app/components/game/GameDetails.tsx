"use client";

const TECH_STACK = [
  { name: 'Next.js 16', color: '#0070f3' },
  { name: 'React 19', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'HTML5 Canvas', color: '#e34c26' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
];

export function GameDetails() {
  return (
    <div style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>
      {/* Row 1: How to Play + Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="flash-panel">
          <div className="flash-panel-header">How to Play</div>
          <div className="flash-panel-body">
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              <li style={{ marginBottom: '5px' }}>Ride your bike through an endless side-scrolling world</li>
              <li style={{ marginBottom: '5px' }}>Collect pizzas floating in the air to earn points</li>
              <li style={{ marginBottom: '5px' }}>Jump over monsters to avoid getting hit — or stomp them!</li>
              <li style={{ marginBottom: '5px' }}>Low pizzas: collect while on the ground</li>
              <li>High pizzas: jump to reach them</li>
            </ul>
          </div>
        </div>

        <div className="flash-panel">
          <div className="flash-panel-header">Controls</div>
          <div className="flash-panel-body">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <td style={{ padding: '5px 0', width: '45%' }}>
                    <span className="flash-kbd">A</span>&nbsp;/&nbsp;<span className="flash-kbd">&#8592;</span>
                  </td>
                  <td style={{ padding: '5px 0', color: '#ccc' }}>Move Left</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <td style={{ padding: '5px 0' }}>
                    <span className="flash-kbd">D</span>&nbsp;/&nbsp;<span className="flash-kbd">&#8594;</span>
                  </td>
                  <td style={{ padding: '5px 0', color: '#ccc' }}>Move Right</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0' }}>
                    <span className="flash-kbd">W</span>&nbsp;/&nbsp;<span className="flash-kbd">&#8593;</span>&nbsp;/&nbsp;<span className="flash-kbd">Space</span>
                  </td>
                  <td style={{ padding: '5px 0', color: '#ccc' }}>Bunny Hop</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: '10px', padding: '6px 8px', background: '#161616', border: '1px solid #2a2a2a', color: '#666', fontSize: '10px' }}>
              Mobile: use the on-screen D-pad controls
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Scoring + Technology + Credits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flash-panel">
          <div className="flash-panel-header">Scoring</div>
          <div className="flash-panel-body">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <td style={{ padding: '6px 0' }}>🍕 Collect Pizza</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', color: '#44cc66', fontWeight: 'bold' }}>+10 pts</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0' }}>👾 Kill Monster</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', color: '#44cc66', fontWeight: 'bold' }}>+50 pts</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: '8px', fontSize: '10px', color: '#555', borderTop: '1px solid #2a2a2a', paddingTop: '8px' }}>
              Tip: stomp monsters by landing on top
            </div>
          </div>
        </div>

        <div className="flash-panel">
          <div className="flash-panel-header">Technology</div>
          <div className="flash-panel-body">
            {TECH_STACK.map(({ name, color }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{ width: '6px', height: '6px', background: color, flexShrink: 0 }} />
                <span style={{ color: '#ccc' }}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flash-panel">
          <div className="flash-panel-header">Credits</div>
          <div className="flash-panel-body">
            <div style={{ marginBottom: '10px' }}>
              <div style={{ color: '#ff9900', fontWeight: 'bold', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Music
              </div>
              <div style={{ color: '#ccc' }}>&ldquo;Cloud Dancer&rdquo;</div>
              <div>
                by{' '}
                <a href="https://incompetech.com/" target="_blank" rel="noopener noreferrer" className="flash-link">
                  Kevin MacLeod
                </a>
              </div>
              <div style={{ fontSize: '10px', color: '#555', marginTop: '4px' }}>
                Licensed under{' '}
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="flash-link" style={{ color: '#555' }}>
                  CC BY 4.0
                </a>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '8px' }}>
              <div style={{ color: '#ff9900', fontWeight: 'bold', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Developer
              </div>
              <a href="#" className="flash-username">hmcldryl</a>
              <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>Palawan, Philippines</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
