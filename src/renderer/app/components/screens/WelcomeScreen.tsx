import { useState } from "react";
import SplashScreen from "./onboarding/SplashScreen";
import UserOnboardingScreen from "./onboarding/UserOnboardingScreen";

function WelcomeScreen() {
  const [currentStage, setCurrentStage] = useState(0);

  // stages of the welcome screen
  const [stage] = useState([
    // stage 1 component
    <SplashScreen currentStage={currentStage} setCurrentStage={setCurrentStage} />,
    // stage 2 component
    <UserOnboardingScreen/>
  ]);

  return (
    <>
      {stage[currentStage > stage.length ? (stage.length - 1) : currentStage]}
    </>
  );
}

export default WelcomeScreen;
