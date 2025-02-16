import GradientBackground from "../../shared/GradientBackground";
import {Bug01Icon} from 'hugeicons-react';
import StartButton from "../../shared/StartButton";
import WindowControls from "../../layouts/WindowControls";


function SplashScreen({setCurrentStage, currentStage}: {setCurrentStage: (stage: number) => void, currentStage: number}) {
  return (
    <>
      {/* Gradient Background */}
      <GradientBackground>
        <div className="w-full h-full flex flex-col">
          <WindowControls />
          <div className="flex-grow flex items-center justify-center">
            <div className="max-w-lg">
              <h2 className="text-6xl text-white opacity-80 font-bold ">
                Take a Peek, <br />
                Spot the Bug
              </h2>
              <StartButton className="mt-10 flex items-center" onClick={() => setCurrentStage(currentStage + 1)}>
                Get Started <Bug01Icon className="w-4 h-4 inline-block ml-2" />
              </StartButton>
            </div>
          </div>
        </div>
      </GradientBackground>
    </>
  );
}

export default SplashScreen;
