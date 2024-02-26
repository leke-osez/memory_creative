export function Tile({ content: Content, flip, state, themeColor }) {
  switch (state) {
    case "start":
      return (
        <div className="relative opacity-100">
          <Back
            style={{
              backgroundColor: `${themeColor}80`,
              opacity: 1,
            }}
            className="inline-block w-full aspect-square text-center rounded-md opacity-100"
            flip={flip}
          />
        </div>
      );
    case "flipped":
      return (
        <Front
          style={{ backgroundColor: `${themeColor}` }}
          className="inline-block w-full aspect-square rounded-md p-1"
        >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
            className={"text-white dark:text-slate-950"}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className="inline-block w-full aspect-square text-white p-1">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
              color: `${themeColor}50`,
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip, style }) {
  return <div onClick={flip} className={className} style={{ ...style }}></div>;
}

function Front({ className, children, style }) {
  return (
    <div className={className} style={{ ...style }}>
      {children}
    </div>
  );
}

function Matched({ className, children, style }) {
  return (
    <div className={className} style={{ ...style }}>
      {children}
    </div>
  );
}
