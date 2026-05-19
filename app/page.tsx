import { GameContainer } from "./components/game/GameContainer";
import { GameDetails } from "./components/game/GameDetails";

const SITE_CATEGORIES = ['Action', 'Adventure', 'Puzzle', 'Sports', 'Shooting', 'RPG', 'Strategy', 'Platformer', 'Other'];
const NAV_LINKS = ['Games', 'Movies', 'Art', 'Music', 'Forum', 'Submit'];
const GAME_TAGS = ['pixel-art', 'side-scroller', 'bike', 'action', 'palawan'];
const FOOTER_LINKS = ['About', 'Contact', 'Privacy Policy', 'Terms of Use', 'Advertise', 'Jobs'];

const FAKE_COMMENTS = [
  {
    id: 1,
    username: 'xXBikeKing99Xx',
    level: 12,
    text: 'omg this game is so sick!!!! the pixel art looks amazing and the controls are super tight. 10/10 would recommend!! also palawan is the best place in the philippines',
    stars: 5,
    date: 'Jan 15, 2025',
    avatarColor: '#3377cc',
    avatarLetter: 'B',
  },
  {
    id: 2,
    username: 'PizzaCollector2000',
    level: 7,
    text: "been playing this for like 3 hours straight lmao cant stop collecting pizzas. one question - can you actually kill the monsters or just jump over them?? trying to figure out the scoring",
    stars: 4,
    date: 'Feb 3, 2025',
    avatarColor: '#cc3333',
    avatarLetter: 'P',
  },
  {
    id: 3,
    username: 'retrogamer_ph',
    level: 23,
    text: 'nice press start 2p font, brings back memories. gameplay is smooth and the parallax background looks real good. small nitpick: wish the jump was a bit more floaty but still a great game overall',
    stars: 5,
    date: 'Mar 10, 2025',
    avatarColor: '#33aa55',
    avatarLetter: 'R',
  },
  {
    id: 4,
    username: 'flashnostalgia',
    level: 35,
    text: "cant believe html5 games have gotten this good. this reminds me of the old newgrounds era except without the random violence lol. the bike physics feel smooth. also love that the world moves instead of the player",
    stars: 4,
    date: 'Apr 22, 2025',
    avatarColor: '#aa6600',
    avatarLetter: 'F',
  },
];

function FlashHeader() {
  return (
    <header style={{ background: '#111111', borderBottom: '2px solid #e8660a' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 20px',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #e8660a 0%, #ff9900 100%)',
            color: '#fff',
            fontFamily: 'Impact, "Arial Narrow", Arial, sans-serif',
            fontSize: '26px',
            fontWeight: 'bold',
            padding: '3px 12px 4px',
            letterSpacing: '3px',
            border: '1px solid rgba(255,153,0,0.4)',
            textShadow: '1px 2px 0 rgba(0,0,0,0.6)',
            lineHeight: '1',
          }}>
            DADA
          </div>
          <div style={{
            color: '#777',
            fontFamily: 'Verdana, Arial, sans-serif',
            fontSize: '10px',
            fontWeight: 'bold',
            letterSpacing: '5px',
            textTransform: 'uppercase',
          }}>
            ARCADE
          </div>
        </div>

        {/* Nav + auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexWrap: 'wrap' }}>
          {NAV_LINKS.map((item) => (
            <a key={item} href="#" className="flash-nav-link">{item}</a>
          ))}
          <span style={{ color: '#333', padding: '0 6px', fontFamily: 'Verdana, Arial, sans-serif' }}>|</span>
          <a href="#" className="flash-btn-orange" style={{ padding: '3px 10px' }}>Login</a>
          <a href="#" className="flash-btn-blue" style={{ padding: '3px 10px', marginLeft: '3px' }}>Register</a>
        </div>
      </div>

      {/* Category bar */}
      <div style={{ background: '#0d0d0d', borderTop: '1px solid #222', padding: '4px 20px' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {SITE_CATEGORIES.map((cat) => (
            <a key={cat} href="#" className="flash-cat-link">{cat}</a>
          ))}
        </div>
      </div>
    </header>
  );
}

function FlashFooter() {
  return (
    <footer style={{
      background: '#0d0d0d',
      borderTop: '2px solid #1e1e1e',
      marginTop: '40px',
      padding: '24px 20px',
      fontFamily: 'Verdana, Arial, sans-serif',
      fontSize: '10px',
      color: '#444',
      textAlign: 'center',
    }}>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap' }}>
        {FOOTER_LINKS.map((link, i) => (
          <span key={link} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <a href="#" className="flash-link" style={{ color: '#555', fontSize: '10px' }}>{link}</a>
            {i < FOOTER_LINKS.length - 1 && <span style={{ color: '#222' }}>|</span>}
          </span>
        ))}
      </div>
      <div>&copy; 2025 Dada&apos;s Arcade &mdash; All Rights Reserved</div>
      <div style={{ marginTop: '6px', color: '#333' }}>
        No Flash Player Required &bull; HTML5 Powered &bull; Proudly from Palawan, Philippines
      </div>
      <div style={{ marginTop: '4px', color: '#252525', fontSize: '9px' }}>
        Best viewed in Internet Explorer 6.0 at 1024&times;768 resolution
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flash-site" style={{ minHeight: '100vh' }}>
      {/* Flash header — desktop only */}
      <div className="hidden md:block">
        <FlashHeader />
      </div>

      {/* Breadcrumb */}
      <div className="hidden md:block" style={{
        background: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
        padding: '5px 20px',
        fontSize: '11px',
        color: '#555',
        fontFamily: 'Verdana, Arial, sans-serif',
      }}>
        <a href="#" className="flash-link">Home</a>
        <span style={{ margin: '0 6px', color: '#333' }}>»</span>
        <a href="#" className="flash-link">Games</a>
        <span style={{ margin: '0 6px', color: '#333' }}>»</span>
        <a href="#" className="flash-link">Action</a>
        <span style={{ margin: '0 6px', color: '#333' }}>»</span>
        <span>Dada&apos;s Ride Out</span>
      </div>

      {/* Game title bar */}
      <div className="hidden md:block" style={{
        padding: '12px 20px 8px',
        background: '#1e1e1e',
        borderBottom: '1px solid #2a2a2a',
      }}>
        <h1 style={{
          fontFamily: 'Impact, "Arial Narrow", Arial, sans-serif',
          fontSize: '28px',
          color: '#ffffff',
          textShadow: '2px 2px 0 #000, 0 0 30px rgba(232,102,10,0.35)',
          margin: 0,
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Dada&apos;s Ride Out
        </h1>
        <div style={{ fontFamily: 'Verdana, Arial, sans-serif', fontSize: '11px', color: '#555', marginTop: '4px' }}>
          A side-scrolling bike adventure through the streets of Palawan
        </div>
      </div>

      {/* Game */}
      <GameContainer />

      {/* Info bar — desktop only */}
      <div
        className="hidden md:flex"
        style={{
          background: '#171717',
          borderTop: '3px solid #e8660a',
          borderBottom: '1px solid #2a2a2a',
          padding: '10px 20px',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          fontFamily: 'Verdana, Arial, sans-serif',
        }}
      >
        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '140px' }}>
          <div style={{
            width: '34px', height: '34px',
            background: 'linear-gradient(135deg, #e8660a, #ff9900)',
            border: '1px solid rgba(255,153,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 'bold', fontSize: '16px',
            fontFamily: 'Impact, sans-serif',
            flexShrink: 0,
          }}>D</div>
          <div>
            <div style={{ fontSize: '10px', color: '#555' }}>By</div>
            <a href="#" className="flash-username" style={{ fontSize: '12px' }}>hmcldryl</a>
          </div>
        </div>

        <div style={{ width: '1px', background: '#2a2a2a', alignSelf: 'stretch', minHeight: '30px' }} />

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <div style={{ color: '#ffcc00', fontSize: '20px', lineHeight: '1', letterSpacing: '2px' }}>&#9733;&#9733;&#9733;&#9733;&#9734;</div>
            <div style={{ color: '#555', fontSize: '10px', marginTop: '2px' }}>4.73 / 5.00 &nbsp;&middot;&nbsp; 12,847 votes</div>
          </div>
          <a href="#" className="flash-btn-orange" style={{ padding: '3px 8px' }}>Rate It!</a>
        </div>

        <div style={{ width: '1px', background: '#2a2a2a', alignSelf: 'stretch', minHeight: '30px' }} />

        {/* Stats */}
        <div style={{ display: 'flex', gap: '20px', fontSize: '11px', color: '#666' }}>
          <span><strong style={{ color: '#aaa' }}>48,291</strong> Views</span>
          <span><strong style={{ color: '#aaa' }}>1,024</strong> Favorites</span>
          <span>Genre: <strong style={{ color: '#e8660a' }}>Action</strong></span>
        </div>

        <div style={{ width: '1px', background: '#2a2a2a', alignSelf: 'stretch', minHeight: '30px' }} />

        {/* Tags */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {GAME_TAGS.map((tag) => (
            <a key={tag} href="#" className="flash-tag">{tag}</a>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <a href="#" className="flash-btn-orange">&#9829; Favorite</a>
          <a href="#" className="flash-btn-blue">&#8679; Share</a>
          <a href="#" className="flash-btn-blue">&#8853; Embed</a>
        </div>
      </div>

      {/* Details + comments */}
      <div style={{ padding: '20px' }}>
        <GameDetails />

        {/* Comments — desktop only */}
        <div className="hidden md:block flash-panel" style={{ marginTop: '20px' }}>
          <div className="flash-panel-header">
            Comments
            <span style={{ color: '#666', fontWeight: 'normal', marginLeft: '8px', fontSize: '10px' }}>(47)</span>
          </div>

          {/* Add comment row */}
          <div style={{
            background: '#1a1a1a',
            padding: '10px 12px',
            borderBottom: '1px solid #252525',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}>
            <div style={{
              width: '36px', height: '36px',
              background: '#252525',
              border: '1px solid #3a3a3a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#444', fontSize: '18px', flexShrink: 0,
            }}>?</div>
            <input
              type="text"
              placeholder="Log in to leave a comment..."
              disabled
              className="flash-input"
              style={{ opacity: 0.4, cursor: 'not-allowed' }}
            />
          </div>

          {FAKE_COMMENTS.map((comment) => (
            <div key={comment.id} className="flash-comment-item">
              <div style={{
                width: '36px', height: '36px',
                background: `linear-gradient(135deg, ${comment.avatarColor}66, ${comment.avatarColor})`,
                border: `1px solid ${comment.avatarColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 'bold', fontSize: '16px',
                fontFamily: 'Impact, sans-serif',
                flexShrink: 0,
              }}>{comment.avatarLetter}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <a href="#" className="flash-username">{comment.username}</a>
                  <span style={{ color: '#444', fontSize: '10px', fontFamily: 'Verdana, Arial, sans-serif' }}>Level {comment.level}</span>
                  <span style={{ color: '#ffcc00', fontSize: '12px', letterSpacing: '1px' }}>
                    {'★'.repeat(comment.stars)}{'☆'.repeat(5 - comment.stars)}
                  </span>
                  <span style={{ color: '#444', fontSize: '10px', marginLeft: 'auto', fontFamily: 'Verdana, Arial, sans-serif' }}>{comment.date}</span>
                </div>
                <div style={{ color: '#aaa', fontSize: '11px', marginTop: '5px', lineHeight: '1.6', fontFamily: 'Verdana, Arial, sans-serif' }}>
                  {comment.text}
                </div>
              </div>
            </div>
          ))}

          {/* Load more */}
          <div style={{
            background: '#161616',
            padding: '10px 12px',
            borderTop: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <a href="#" className="flash-btn-blue" style={{ padding: '4px 16px' }}>Load More Comments</a>
            <span style={{ color: '#444', fontSize: '10px', fontFamily: 'Verdana, Arial, sans-serif' }}>
              Showing 4 of 47 comments
            </span>
          </div>
        </div>
      </div>

      {/* Footer — desktop only */}
      <div className="hidden md:block">
        <FlashFooter />
      </div>
    </div>
  );
}
