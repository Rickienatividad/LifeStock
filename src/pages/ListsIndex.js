import { Link } from "react-router-dom";

export function ListsIndex(props) {
  let array = [];
  let listArray = [];

  Object.entries(props.checklists).map((item) => {
    listArray.push(item[1]);
    item[1].manifests.forEach((item) => {
      array.push(item);
    });
    return item;
  });

  return (
    <div>
      {listArray
        .sort((a, b) => a.rig_id - b.rig_id)
        .map((list) => (
          <div key={list.id}>
            <Link to="#" onClick={() => props.onSelectList(list)}>
              Rig: {list.rig_id} - {list.date}
            </Link>
          </div>
        ))}
    </div>
  );
}