export function Workspaces() {
  return (
    <button onClicked={(self) => console.log(self, "clicked")}>
      <label label="Workspaces" />
    </button>
  );
}