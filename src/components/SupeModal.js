import "../style/SupeModal.css";

export function SupeModal(props) {
  if (props.show) {
    return (
      <div className="supe-modal-background">
        <section className="supe-modal-main">
          {props.children}
          <button
            className="close supe-modal-close-btn"
            type="button"
            onClick={props.onClose}
          >
            &#x2715;
          </button>
        </section>
      </div>
    );
  }
}
