import { Fragment } from "react";
export function ListsShow(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Minimum Count</td>
            <td>Actual Count</td>
            <td>Rig Id: {props.list.rig_id}</td>
          </tr>
        </thead>
        {props.array.map((manifest) =>
          manifest.checklist_id === props.list.id ? (
            <tbody key={Math.random(manifest.id)}>
              <tr>
                <td>{manifest.item}</td>
                <td>{manifest.minimum}</td>
                <td>{manifest.actual}</td>
              </tr>
            </tbody>
          ) : (
            // <></>
            <Fragment key={Math.random()} />
          )
        )}
        <tbody>
          <tr>
            <td>Rig {props.list.rig_id}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
