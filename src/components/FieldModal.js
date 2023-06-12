import "../style/FieldModal.css";

export function FieldModal(props) {
  return (
    <div>
      <section className="modal-main">{props.children}</section>
    </div>
  );
}
