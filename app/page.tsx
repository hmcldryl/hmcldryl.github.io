import { GameContainer } from "./components/game/GameContainer";
import { GameDetails } from "./components/game/GameDetails";

export default function Home() {
  return (
    <div className="w-full flex flex-col" style={{ backgroundColor: '#eeeeee' }}>
      {/* Desktop: centered column layout, Mobile: full width */}
      <div className="w-full flex flex-col items-center">
        <GameContainer />
        <GameDetails />
      </div>
    </div>
  );
}
