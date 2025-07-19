export function CurrentWindow() {
  return (
    <button onClicked={() => console.log("window")}>
      <label label="CURRENT WINDOW" />
    </button>
  );
}