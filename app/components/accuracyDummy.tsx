interface accuracyDummyProps {
  headColor?: string;
  bodyColor?: string;
  legsColor?: string;
}

export const AccuracyDummy = ({
  headColor,
  bodyColor,
  legsColor,
}: accuracyDummyProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 140">
      {/* Head */}
      <circle cx="50" cy="20" r="12" fill={headColor || "#898c91"} />

      {/* Body */}
      <rect
        x="40"
        y="35"
        width="20"
        height="50"
        fill={bodyColor || "#898c91"}
      />

      {/* Left Arm */}
      <rect x="7" y="35" width="30" height="7" fill={bodyColor || "#898c91"} />

      {/* Right Arm */}
      <rect x="63" y="35" width="30" height="7" fill={bodyColor || "#898c91"} />

      {/* Left Leg */}
      <rect x="40" y="88" width="8" height="45" fill={legsColor || "#898c91"} />

      {/* Right Leg */}
      <rect x="52" y="88" width="8" height="45" fill={legsColor || "#898c91"} />
    </svg>
  );
};

export default AccuracyDummy;
